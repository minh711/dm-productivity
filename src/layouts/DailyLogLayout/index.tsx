import { DAILY_LOG_PATH, HOME_PATH, routeTitles } from '../../constants';
import { HomeOutlined, BorderOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DmFooter from '../../components/Footer';
import DmHeader from '../../components/Header';
import DmSider from '../../components/Sider';
import React, { ReactNode } from 'react';

const { Content } = Layout;

interface DailyLogLayoutProps {
  children?: ReactNode;
}

const DailyLogLayout: React.FC<DailyLogLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'home',
      icon: (
        <span role="img" aria-label="home">
          🏠
        </span>
      ),
      label: t(routeTitles[HOME_PATH]),
      onClick: () => navigate(HOME_PATH),
    },
    {
      key: 'daily-log',
      icon: (
        <span role="img" aria-label="daily-log">
          📝
        </span>
      ),
      label: t(routeTitles[DAILY_LOG_PATH]),
      onClick: () => navigate(DAILY_LOG_PATH),
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
      <DmSider menuItems={menuItems} />
      <Layout>
        <DmHeader />
        <Content className="p-m">
          {children || <div>Welcome to the Dashboard!</div>}
        </Content>
        <DmFooter />
      </Layout>
    </Layout>
  );
};

export default DailyLogLayout;
