import { MusicTag } from '../models';

export class MusicTagRepository {
  private static storeName = 'musicTags';

  static async getAll(): Promise<MusicTag[]> {
    return (await window.electron.get(this.storeName, [])) as MusicTag[];
  }

  static async add(tag: MusicTag): Promise<void> {
    const tags = await this.getAll();
    tags.push(tag);
    await window.electron.set(this.storeName, tags);
  }

  static async update(updatedTag: MusicTag): Promise<boolean> {
    const tags = await this.getAll();
    const index = tags.findIndex((t) => t.id === updatedTag.id);

    if (index === -1) return false;

    tags[index] = updatedTag;
    await window.electron.set(this.storeName, tags);
    return true;
  }

  static async delete(tagId: string): Promise<boolean> {
    const tags = await this.getAll();
    const filteredTags = tags.filter((t) => t.id !== tagId);

    if (filteredTags.length === tags.length) return false;

    await window.electron.set(this.storeName, filteredTags);
    return true;
  }
}
