import { DAILY_LOG_PATH, HOME_PATH, roles } from '../constants';
import DailyLogLayout from '../layouts/DailyLogLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import { default as DailyLogDashboardPage } from '../pages/DailyLog/DashboardPage';
import HomePage from '../pages/HomePage';

export const routes = [
  {
    path: HOME_PATH,
    component: HomePage,
    roles: [],
    isProtected: false,
    layout: DashboardLayout,
  },
  {
    path: DAILY_LOG_PATH,
    component: DailyLogDashboardPage,
    roles: [],
    isProtected: false,
    layout: DailyLogLayout,
  },
];
