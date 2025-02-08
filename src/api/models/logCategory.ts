export interface LogCategory {
  id: string;
  order?: number;
  name: string;
  description: string;
  totalDuration: number;
  createdAt: Date;
  finishedAt?: Date;
  color: string;
}
