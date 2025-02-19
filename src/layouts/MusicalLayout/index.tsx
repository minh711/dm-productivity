import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
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

export default MusicalLayout;
