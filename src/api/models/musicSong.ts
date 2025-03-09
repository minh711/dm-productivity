import { MusicSection } from './musicSection';
import { MusicTag } from './musicTag';

export interface MusicSong {
  id: string;
  name: string;
  thumbnail?: string;
  audio?: string;
  musicSections?: string[];
  tagIds?: string[];
  tags?: MusicTag[];
  createdAt: Date;
  updatedAt: Date;
}
