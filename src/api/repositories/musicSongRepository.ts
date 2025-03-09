import { MusicSong } from '../models';

export class MusicSongRepository {
  private static storeName = 'musicSongs';

  static async getAll(): Promise<MusicSong[]> {
    const songs = (await window.electron.get(
      this.storeName,
      []
    )) as MusicSong[];
    return songs.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  static async getById(id: string): Promise<MusicSong | null> {
    const songs = (await window.electron.get(
      this.storeName,
      []
    )) as MusicSong[];
    return songs.find((s) => s.id === id) || null;
  }

  static async add(song: MusicSong): Promise<void> {
    const now = new Date();
    const newSong: MusicSong = { ...song, createdAt: now, updatedAt: now };

    const songs = await this.getAll();
    songs.push(newSong);
    await window.electron.set(this.storeName, songs);
  }

  static async update(updatedSong: MusicSong): Promise<boolean> {
    const songs = await this.getAll();
    const index = songs.findIndex((s) => s.id === updatedSong.id);

    if (index === -1) return false;

    const oldSong = songs[index];

    if (oldSong.thumbnail && oldSong.thumbnail !== updatedSong.thumbnail) {
      await window.electron.deleteFile(oldSong.thumbnail);
    }

    if (oldSong.audio && oldSong.audio !== updatedSong.audio) {
      await window.electron.deleteFile(oldSong.audio);
    }

    songs[index] = { ...updatedSong, updatedAt: new Date() };
    await window.electron.set(this.storeName, songs);
    return true;
  }

  static async delete(songId: string): Promise<boolean> {
    const songs = await this.getAll();
    const filteredSongs = songs.filter((s) => s.id !== songId);

    if (filteredSongs.length === songs.length) return false;

    await window.electron.set(this.storeName, filteredSongs);
    return true;
  }
}
