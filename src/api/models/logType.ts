export interface LogType {
  id: string;
  order?: number;
  name: string;
  description: string;
  totalDuration: number;
  createdAt: Date;
  finishedAt?: Date;
  color: string;
}
