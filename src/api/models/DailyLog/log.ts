import { LogCategory } from './logCategory';
import { LogType } from './logType';

export interface Log {
  id: string;
  order?: number;
  date: Date;
  duration: number;
  description: string;
  logTypeId?: string;
  logCategoryId?: string;
  logType?: LogType;
  logCategory?: LogCategory;
}
