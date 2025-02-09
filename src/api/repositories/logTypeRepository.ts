import { LogType } from '../models';

export class LogTypeRepository {
  private static storageKey = 'logTypes';

  static getAll(): LogType[] {
    const logsJson = localStorage.getItem(this.storageKey);
    return logsJson ? JSON.parse(logsJson) : [];
  }

  static add(logType: LogType): void {
    const logTypes = this.getAll();
    logTypes.push(logType);
    localStorage.setItem(this.storageKey, JSON.stringify(logTypes));
  }

  static update(updatedLogType: LogType): boolean {
    const logTypes = this.getAll();
    const index = logTypes.findIndex((log) => log.id === updatedLogType.id);

    if (index === -1) return false;

    logTypes[index] = updatedLogType;
    localStorage.setItem(this.storageKey, JSON.stringify(logTypes));
    return true;
  }

  static delete(logTypeId: string): boolean {
    const logTypes = this.getAll();
    const filteredLogTypes = logTypes.filter(
      (logType) => logType.id !== logTypeId
    );

    if (filteredLogTypes.length === logTypes.length) return false;

    localStorage.setItem(this.storageKey, JSON.stringify(filteredLogTypes));
    return true;
  }
}
