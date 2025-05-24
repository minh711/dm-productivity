export interface MusicSection {
  id: string;
  name: string;
  tagIds: string[];
  tags?: string[];
  // contentIds?: string[];
  contentIds: { id: string; order: number }[];
}
