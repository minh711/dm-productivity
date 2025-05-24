import { Log } from '../models';

export class LogRepository {
  private static storeName = 'logs';

  // static async getAll(): Promise<Log[]> {
  //   return (await window.electron.get(this.storeName, [])) as Log[];
  // }

  static async getByDate(date: Date): Promise<Log[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const storeNameWithDate = `${this.storeName}-${year}-${month}`; // yyyy-mm
    return (await window.electron.get(storeNameWithDate, [])) as Log[];
  }

  static async add(log: Log): Promise<void> {
    const logs = await this.getByDate(log.date);
    log.order ||= 0;
    logs.push(log);
    await window.electron.set(`${this.storeName}`, logs);
  }

  static async update(updatedLog: Log): Promise<boolean> {
    const logs = await this.getByDate(updatedLog.date);
    const index = logs.findIndex((log) => log.id === updatedLog.id);

    if (index === -1) return false;

    logs[index] = updatedLog;
    await window.electron.set(this.storeName, logs);
    return true;
  }

  static async delete(logId: string, date: Date): Promise<boolean> {
    const logs = await this.getByDate(date);
    const filteredLogs = logs.filter((log) => log.id !== logId);

    if (filteredLogs.length === logs.length) return false;

    await window.electron.set(this.storeName, filteredLogs);
    return true;
  }
}
