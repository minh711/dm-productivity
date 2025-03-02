import { MusicTag } from './musicTag';

export interface MusicSectionContent {
  id: string;
  description: string;
  pdf?: string;
  audio?: string;
  notes?: string;
  tagIds: string[];
  tags?: MusicTag[];
}
