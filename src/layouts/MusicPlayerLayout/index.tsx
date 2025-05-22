import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
  MUSIC_PLAYER_PATH,
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

const { Content } = Layout;

interface Props {
  children?: ReactNode;
}

const MusicPlayerLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      key: 'dashboard',
      icon: (
        <span role="img" aria-label="dashboard">
          <DmLink to={MUSIC_PLAYER_PATH}>📻</DmLink>
        </span>
      ),
      label: (
        <DmLink to={MUSIC_PLAYER_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSIC_PLAYER_PATH])}
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

export default MusicPlayerLayout;
