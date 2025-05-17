import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
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
import DmLink from '../../components/DmLink';

const { Content } = Layout;

interface DailyLogLayoutProps {
  children?: ReactNode;
}

const DailyLogLayout: React.FC<DailyLogLayoutProps> = ({ children }) => {
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
      label: t(routeTitles[DAILY_LOG_PATH]),
      onClick: () => navigate(DAILY_LOG_PATH),
    },
    {
      key: 'log-type-category',
      icon: (
        <span role="img" aria-label="log-type-category">
          🎹
        </span>
      ),
      className: 'wrap',
      // label: t(routeTitles[LOG_TYPE_AND_CATEGORY_PATH]),
      // onClick: () => navigate(LOG_TYPE_AND_CATEGORY_PATH),
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          {t(routeTitles[LOG_TYPE_AND_CATEGORY_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'chart',
      icon: (
        <span role="img" aria-label="chart">
          📊
        </span>
      ),
      className: 'wrap',
      label: 'Biểu đồ',
      onClick: () => navigate(LOG_TYPE_AND_CATEGORY_PATH),
    },
    {
      key: 'calendar',
      icon: (
        <span role="img" aria-label="calendar">
          📅
        </span>
      ),
      className: 'wrap',
      label: 'Lịch',
      onClick: () => navigate(LOG_TYPE_AND_CATEGORY_PATH),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
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

export default DailyLogLayout;
