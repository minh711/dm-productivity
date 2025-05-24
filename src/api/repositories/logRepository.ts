import { Log } from '../models';

export class LogRepository {
  private static storeName = 'logs';

  private static getStoreKey(date: Date | string) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${this.storeName}-${y}-${m}`; // -yyyy-mm
  }

  static async getAllByMonth(date: Date): Promise<Log[]> {
    const key = this.getStoreKey(date);
    return (await window.electron.get(key, [])) as Log[];
  }

  static async getAllByDate(date: Date): Promise<Log[]> {
    const all = await this.getAllByMonth(date);
    return all.filter((log) => {
      const d = new Date(log.date);
      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });
  }

  static async add(log: Log): Promise<void> {
    const key = this.getStoreKey(log.date);
    const logs = await this.getAllByMonth(log.date);
    log.order ??= 0;
    logs.push(log);
    await window.electron.set(key, logs);
  }

  static async update(updatedLog: Log): Promise<boolean> {
    const key = this.getStoreKey(updatedLog.date);
    const logs = await this.getAllByMonth(updatedLog.date);
    const idx = logs.findIndex((l) => l.id === updatedLog.id);
    if (idx === -1) return false;

    logs[idx] = updatedLog;
    await window.electron.set(key, logs);
    return true;
  }

  static async delete(logId: string, date: Date): Promise<boolean> {
    const key = this.getStoreKey(date);
    const logs = await this.getAllByMonth(date);
    const filtered = logs.filter((l) => l.id !== logId);
    if (filtered.length === logs.length) return false;

    await window.electron.set(key, filtered);
    return true;
  }
}
