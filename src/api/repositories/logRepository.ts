import { Log } from '../models';

export class LogRepository {
  private static storeName = 'logs';

  static async getAll(): Promise<Log[]> {
    return (await window.electron.get(this.storeName, [])) as Log[];
  }

  static async add(log: Log): Promise<void> {
    const logs = await this.getAll();
    log.order ||= 0;
    logs.push(log);
    await window.electron.set(this.storeName, logs);
  }

  static async update(updatedLog: Log): Promise<boolean> {
    const logs = await this.getAll();
    const index = logs.findIndex((log) => log.id === updatedLog.id);

    if (index === -1) return false;

    logs[index] = updatedLog;
    await window.electron.set(this.storeName, logs);
    return true;
  }

  static async delete(logId: string): Promise<boolean> {
    const logs = await this.getAll();
    const filteredLogs = logs.filter((log) => log.id !== logId);

    if (filteredLogs.length === logs.length) return false;

    await window.electron.set(this.storeName, filteredLogs);
    return true;
  }
}
