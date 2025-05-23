import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_LIST_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
  MUSIC_PLAYER_PATH,
  MUSIC_SECTION_PATH,
  MUSIC_SONG_PATH,
  MUSICAL_PATH,
  roles,
  SETTINGS_PATH,
} from '../constants';
import DailyLogLayout from '../layouts/DailyLogLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import MusicalLayout from '../layouts/MusicalLayout';
import { default as DailyLogDashboardPage } from '../pages/DailyLog/DashboardPage';
import LogTypePage from '../pages/DailyLog/LogTypeAndCategoryPage';
import HomePage from '../pages/HomePage';
import MusicalDashboardPage from '../pages/Musical/DashboardPage';
import MusicSectionPage from '../pages/Musical/MusicSectionPage';
import MusicSongPage from '../pages/Musical/MusicSongPage';
import MusicSongDetailPage from '../pages/Musical/MusicSongDetailPage';
import SettingsPage from '../pages/SettingsPage';
import MusicPlayerDashboardPage from '../pages/MusicPlayer/DashboardPage';
import MusicPlayerLayout from '../layouts/MusicPlayerLayout';
import LogListPage from '../pages/DailyLog/LogListPage';

export const routes = [
  {
    path: HOME_PATH,
    component: HomePage,
    roles: [],
    isProtected: false,
    layout: DashboardLayout,
  },
  {
    path: SETTINGS_PATH,
    component: SettingsPage,
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
  {
    path: LOG_LIST_PATH,
    component: LogListPage,
    roles: [],
    isProtected: false,
    layout: DailyLogLayout,
  },
  {
    path: LOG_TYPE_AND_CATEGORY_PATH,
    component: LogTypePage,
    roles: [],
    isProtected: false,
    layout: DailyLogLayout,
  },
  {
    path: MUSICAL_PATH,
    component: MusicalDashboardPage,
    roles: [],
    isProtected: false,
    layout: MusicalLayout,
  },
  {
    path: `${MUSIC_SONG_PATH}/:id`,
    component: MusicSongDetailPage,
    roles: [],
    isProtected: false,
    layout: MusicalLayout,
  },
  {
    path: MUSIC_SONG_PATH,
    component: MusicSongPage,
    roles: [],
    isProtected: false,
    layout: MusicalLayout,
  },
  {
    path: MUSIC_SECTION_PATH,
    component: MusicSectionPage,
    roles: [],
    isProtected: false,
    layout: MusicalLayout,
  },
  {
    path: MUSIC_PLAYER_PATH,
    component: MusicPlayerDashboardPage,
    roles: [],
    isProtected: false,
    layout: MusicPlayerLayout,
  },
];
