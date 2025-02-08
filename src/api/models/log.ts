import { LogCategory } from './logCategory';
import { LogType } from './logType';

export interface Log {
  id: string;
  date: Date;
  duration: number;
  logTypeId?: string;
  logCategoryId?: string;
  logType?: LogType;
  logCategory?: LogCategory;
}
