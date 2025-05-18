import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
  MUSIC_SECTION_PATH,
  MUSIC_SONG_PATH,
  MUSICAL_PATH,
  routeTitles,
} from '../../constants';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import DmFooter from '../../components/general/DmFooter';
import DmHeader from '../../components/general/DmHeader';
import DmSider from '../../components/general/Sider';
import React, { ReactNode } from 'react';
import DmLink from '../../components/general/DmLink';

const { Content } = Layout;

interface MusicalLayoutProps {
  children?: ReactNode;
}

const MusicalLayout: React.FC<MusicalLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      key: 'dashboard',
      icon: (
        <span role="img" aria-label="dashboard">
          📝
        </span>
      ),
      label: (
        <DmLink to={MUSICAL_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSICAL_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'song',
      icon: (
        <span role="img" aria-label="song">
          🎼
        </span>
      ),
      label: (
        <DmLink to={MUSIC_SONG_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSIC_SONG_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'section',
      icon: (
        <span role="img" aria-label="section">
          🎹
        </span>
      ),
      label: (
        <DmLink to={MUSIC_SECTION_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSIC_SECTION_PATH])}
        </DmLink>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <DmSider menuItems={menuItems} />
      <Layout>
        <DmHeader />
        <div style={{ height: '100%', overflowY: 'auto' }}>
          <Content className="p-m" style={{ minHeight: 'calc(100% - 70px)' }}>
            {children || <div>Welcome to the Dashboard!</div>}
          </Content>
          <DmFooter />
        </div>
      </Layout>
    </Layout>
  );
};

export default MusicalLayout;
