import { MusicSection } from '../models';

export class MusicSectionRepository {
  private static storeName = 'musicSections';

  static async getAll(): Promise<MusicSection[]> {
    return (await window.electron.get(this.storeName, [])) as MusicSection[];
  }

  static async getById(id: string): Promise<MusicSection | null> {
    const sections = (await window.electron.get(
      this.storeName,
      []
    )) as MusicSection[];
    return sections.find((s) => s.id === id) || null;
  }

  static async add(section: MusicSection): Promise<void> {
    const sections = await this.getAll();
    sections.push(section);
    await window.electron.set(this.storeName, sections);
  }

  static async update(updatedSection: MusicSection): Promise<boolean> {
    const sections = await this.getAll();
    const index = sections.findIndex((s) => s.id === updatedSection.id);

    if (index === -1) return false;

    sections[index] = updatedSection;
    await window.electron.set(this.storeName, sections);
    return true;
  }

  static async delete(sectionId: string): Promise<boolean> {
    const sections = await this.getAll();
    const filteredSections = sections.filter((s) => s.id !== sectionId);

    if (filteredSections.length === sections.length) return false;

    await window.electron.set(this.storeName, filteredSections);
    return true;
  }
}
