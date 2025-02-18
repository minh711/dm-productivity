import { AppSettings } from '../models';

export class AppSettingsRepository {
  private static storeName = 'settings';

  static async getSettings(): Promise<AppSettings> {
    return await window.electron.get(this.storeName, {} as AppSettings);
  }

  static async setSettings(settings: AppSettings): Promise<void> {
    await window.electron.set(this.storeName, settings);
  }
}
