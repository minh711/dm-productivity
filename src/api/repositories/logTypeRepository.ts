import { LogType } from '../models';

export class LogTypeRepository {
  private static storeName = 'logTypes';

  static async getAll(): Promise<LogType[]> {
    return (await window.electron.get(this.storeName, [])) as LogType[];
  }

  static async add(logType: LogType): Promise<void> {
    const logTypes = await this.getAll();
    logTypes.push(logType);
    await window.electron.set(this.storeName, logTypes);
  }

  static async update(updatedLogType: LogType): Promise<boolean> {
    const logTypes = await this.getAll();
    const index = logTypes.findIndex((log) => log.id === updatedLogType.id);

    if (index === -1) return false;

    logTypes[index] = updatedLogType;
    await window.electron.set(this.storeName, logTypes);
    return true;
  }

  static async delete(logTypeId: string): Promise<boolean> {
    const logTypes = await this.getAll();
    const filteredLogTypes = logTypes.filter(
      (logType) => logType.id !== logTypeId
    );

    if (filteredLogTypes.length === logTypes.length) return false;

    await window.electron.set(this.storeName, filteredLogTypes);
    return true;
  }
}
