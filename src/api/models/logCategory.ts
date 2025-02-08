export interface LogCategory {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  createdAt: Date;
  finishedAt?: Date;
  color: string;
}
