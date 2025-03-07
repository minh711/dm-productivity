import { MusicSectionContent } from './musicSectionContent';
import { MusicTag } from './musicTag';

export interface MusicSection {
  id: string;
  name: string;
  tagIds: string[];
  tags?: MusicTag[];
  contentIds?: string[];
  contents?: MusicSectionContent[];
}
