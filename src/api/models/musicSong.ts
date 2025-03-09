export interface MusicSong {
  id: string;
  name: string;
  thumbnail?: string;
  audio?: string;
  musicSections: { id: string; order: number }[];
  tagIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}
