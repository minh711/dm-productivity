import { LogCategory } from '../models';

export class LogCategoryRepository {
  private static storageKey = 'logCategories';

  static getAll(): LogCategory[] {
    const categoriesJson = localStorage.getItem(this.storageKey);
    return categoriesJson ? JSON.parse(categoriesJson) : [];
  }

  static add(logCategory: LogCategory): void {
    const categories = this.getAll();
    categories.push(logCategory);
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  static update(updatedLogCategory: LogCategory): boolean {
    const categories = this.getAll();
    const index = categories.findIndex(
      (category) => category.id === updatedLogCategory.id
    );

    if (index === -1) return false;

    categories[index] = updatedLogCategory;
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
    return true;
  }

  static delete(logCategoryId: string): boolean {
    const categories = this.getAll();
    const filteredCategories = categories.filter(
      (category) => category.id !== logCategoryId
    );

    if (filteredCategories.length === categories.length) return false;

    localStorage.setItem(this.storageKey, JSON.stringify(filteredCategories));
    return true;
  }
}
