import { LogCategory } from '../models';

export class LogCategoryRepository {
  private static storeName = 'logCategories';

  static async getAll(): Promise<LogCategory[]> {
    return (await window.electron.get(this.storeName, [])) as LogCategory[];
  }

  static async add(logCategory: LogCategory): Promise<void> {
    const categories = await this.getAll();
    categories.push(logCategory);
    await window.electron.set(this.storeName, categories);
  }

  static async update(updatedLogCategory: LogCategory): Promise<boolean> {
    const categories = await this.getAll();
    const index = categories.findIndex(
      (category) => category.id === updatedLogCategory.id
    );

    if (index === -1) return false;

    categories[index] = updatedLogCategory;
    await window.electron.set(this.storeName, categories);
    return true;
  }

  static async delete(logCategoryId: string): Promise<boolean> {
    const categories = await this.getAll();
    const filteredCategories = categories.filter(
      (category) => category.id !== logCategoryId
    );

    if (filteredCategories.length === categories.length) return false;

    await window.electron.set(this.storeName, filteredCategories);
    return true;
  }
}
