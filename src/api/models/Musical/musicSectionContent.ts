import { MusicTag } from './musicTag';

export interface MusicSectionContent {
  id: string;
  order?: number;
  description: string;
  image?: string;
  pdf?: string;
  audio?: string;
  notes?: string;
  tagIds: string[];
  tags?: MusicTag[];
}
