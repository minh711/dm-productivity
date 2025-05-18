import {
  DAILY_LOG_PATH,
  HOME_PATH,
  MUSICAL_PATH,
  routeTitles,
} from '../../constants';
import {
  HomeOutlined,
  BorderOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Layout, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DmFooter from '../../components/General/DmFooter';
import DmHeader from '../../components/General/DmHeader';
import DmSider from '../../components/General/Sider';
import React, { ReactNode } from 'react';
import DmLink from '../../components/General/DmLink';

const { Content } = Layout;

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dashboardMenuItems = [
    {
      key: 'home',
      icon: (
        <span role="img" aria-label="home">
          🏠
        </span>
      ),
      label: (
        <DmLink to={HOME_PATH} style={{ width: '100%' }}>
          {t(routeTitles[HOME_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'daily-log',
      icon: (
        <span role="img" aria-label="daily-log">
          📝
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={DAILY_LOG_PATH} style={{ width: '100%' }}>
          {t(routeTitles[DAILY_LOG_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'musical',
      icon: (
        <span role="img" aria-label="musical">
          🎼
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={MUSICAL_PATH} style={{ width: '100%' }}>
          {t(routeTitles[MUSICAL_PATH])}
        </DmLink>
      ),
    },
    // {
    //   key: 'group',
    //   icon: (
    //     <span role="img" aria-label="grape">
    //       🍇
    //     </span>
    //   ),
    //   label: 'Group',
    //   children: [
    //     {
    //       key: 'group.member1',
    //       icon: <BorderOutlined />,
    //       label: 'Member 1',
    //       onClick: () => navigate(HOME_PATH),
    //     },
    //     {
    //       key: 'group.member2',
    //       icon: <BorderOutlined />,
    //       label: 'Member 2',
    //       onClick: () => navigate(HOME_PATH),
    //     },
    //   ],
    // },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DmSider menuItems={dashboardMenuItems} />
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

export default DashboardLayout;
