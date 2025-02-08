import { Log } from '../models';

export class LogRepository {
  private static getStorageKey(date: Date): string {
    return date.toISOString().slice(0, 7); // "yyyy-mm"
  }

  static get(date: Date): Log[] {
    const key = this.getStorageKey(date);
    const logsJson = localStorage.getItem(key);
    return logsJson ? JSON.parse(logsJson) : [];
  }

  static add(log: Log): void {
    const key = this.getStorageKey(log.date);
    const logs = this.get(log.date);
    log.order ||= 0;
    logs.push(log);
    localStorage.setItem(key, JSON.stringify(logs));
  }

  static update(updatedLog: Log): boolean {
    const key = this.getStorageKey(updatedLog.date);
    const logs = this.get(updatedLog.date);
    const index = logs.findIndex((log) => log.id === updatedLog.id);

    if (index === -1) return false;

    logs[index] = updatedLog;
    localStorage.setItem(key, JSON.stringify(logs));
    return true;
  }

  static delete(logId: string, date: Date): boolean {
    const key = this.getStorageKey(date);
    const logs = this.get(date);
    const filteredLogs = logs.filter((log) => log.id !== logId);

    if (filteredLogs.length === logs.length) return false;

    localStorage.setItem(key, JSON.stringify(filteredLogs));
    return true;
  }
}
