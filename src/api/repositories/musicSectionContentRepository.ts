import { MusicSectionContent } from '../models';

export class MusicSectionContentRepository {
  private static storeName = 'musicSectionContents';

  static async getAll(): Promise<MusicSectionContent[]> {
    return (await window.electron.get(
      this.storeName,
      []
    )) as MusicSectionContent[];
  }

  static async add(content: MusicSectionContent): Promise<void> {
    const contents = await this.getAll();
    contents.push(content);
    await window.electron.set(this.storeName, contents);
  }

  static async update(updatedContent: MusicSectionContent): Promise<boolean> {
    const contents = await this.getAll();
    const index = contents.findIndex((c) => c.id === updatedContent.id);

    if (index === -1) return false;

    contents[index] = updatedContent;
    await window.electron.set(this.storeName, contents);
    return true;
  }

  static async delete(contentId: string): Promise<boolean> {
    const contents = await this.getAll();
    const filteredContents = contents.filter((c) => c.id !== contentId);

    if (filteredContents.length === contents.length) return false;

    await window.electron.set(this.storeName, filteredContents);
    return true;
  }
}
