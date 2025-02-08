import { LogCategory } from './logCategory';
import { LogType } from './logType';

export interface Log {
  id: string;
  order?: number;
  date: Date;
  duration: number;
  logTypeId?: string;
  logCategoryId?: string;
  logType?: LogType;
  logCategory?: LogCategory;
}
