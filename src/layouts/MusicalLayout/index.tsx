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
import DmFooter from '../../components/General/DmFooter';
import DmHeader from '../../components/General/DmHeader';
import DmSider from '../../components/General/Sider';
import React, { ReactNode } from 'react';
import DmLink from '../../components/General/DmLink';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

interface MusicalLayoutProps {
  children?: ReactNode;
}

const MusicalLayout: React.FC<MusicalLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: (
        <span role="img" aria-label="dashboard">
          <DmLink to={MUSICAL_PATH}>📝</DmLink>
        </span>
      ),
      label: (
        <DmLink to={MUSICAL_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSICAL_PATH])}
        </DmLink>
      ),
      onClick: () => navigate(MUSICAL_PATH),
    },
    {
      key: 'song',
      icon: (
        <span role="img" aria-label="song">
          <DmLink to={MUSIC_SONG_PATH}>🎼</DmLink>
        </span>
      ),
      label: (
        <DmLink to={MUSIC_SONG_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSIC_SONG_PATH])}
        </DmLink>
      ),
      onClick: () => navigate(MUSIC_SONG_PATH),
    },
    {
      key: 'section',
      icon: (
        <span role="img" aria-label="section">
          <DmLink to={MUSIC_SECTION_PATH}>🎹</DmLink>
        </span>
      ),
      label: (
        <DmLink to={MUSIC_SECTION_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSIC_SECTION_PATH])}
        </DmLink>
      ),
      onClick: () => navigate(MUSIC_SECTION_PATH),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <DmSider menuItems={menuItems} />
      <Layout>
        <DmHeader />
        <div style={{ height: '100%', overflowY: 'auto' }}>
          <Content className="p-m" style={{ minHeight: 'calc(100% - 67px)' }}>
            {children || <div>Welcome to the Dashboard!</div>}
          </Content>
          <DmFooter />
        </div>
      </Layout>
    </Layout>
  );
};

export default MusicalLayout;
