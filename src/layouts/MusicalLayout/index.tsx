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
import { HomeOutlined, BorderOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DmFooter from '../../components/Footer';
import DmHeader from '../../components/Header';
import DmSider from '../../components/Sider';
import React, { ReactNode } from 'react';

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
          📝
        </span>
      ),
      label: t(routeTitles[MUSICAL_PATH]),
      onClick: () => navigate(MUSICAL_PATH),
    },
    {
      key: 'song',
      icon: (
        <span role="img" aria-label="song">
          🎼
        </span>
      ),
      label: t(routeTitles[MUSIC_SONG_PATH]),
      onClick: () => navigate(MUSIC_SONG_PATH),
    },
    {
      key: 'section',
      icon: (
        <span role="img" aria-label="section">
          🎹
        </span>
      ),
      label: t(routeTitles[MUSIC_SECTION_PATH]),
      onClick: () => navigate(MUSIC_SECTION_PATH),
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
