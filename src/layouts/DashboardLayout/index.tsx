// src/components/DashboardLayout/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import DmHeader from '../../components/Header';
import DmSider from '../../components/Sider';
import DmFooter from '../../components/Footer';
import {
  HomeOutlined,
  AppstoreAddOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH, routeTitles } from '../../constants';

const { Content } = Layout;

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const dashboardMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: routeTitles[HOME_PATH],
      onClick: () => navigate(HOME_PATH),
    },
    {
      key: 'group',
      icon: <BorderOutlined />,
      label: 'Group',
      children: [
        {
          key: 'group.member1',
          icon: <BorderOutlined />,
          label: 'Member 1',
          onClick: () => navigate(HOME_PATH),
        },
        {
          key: 'group.member2',
          icon: <BorderOutlined />,
          label: 'Member 2',
          onClick: () => navigate(HOME_PATH),
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DmSider menuItems={dashboardMenuItems} />
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

export default DashboardLayout;
