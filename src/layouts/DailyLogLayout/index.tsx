import {
  DAILY_LOG_PATH,
  HOME_PATH,
  LOG_CATEGORY_PATH,
  LOG_TYPE_AND_CATEGORY_PATH,
  routeTitles,
} from '../../constants';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DmFooter from '../../components/general/DmFooter';
import DmHeader from '../../components/general/DmHeader';
import DmSider from '../../components/general/Sider';
import React, { ReactNode } from 'react';
import DmLink from '../../components/general/DmLink';

const { Content } = Layout;

interface DailyLogLayoutProps {
  children?: ReactNode;
}

const DailyLogLayout: React.FC<DailyLogLayoutProps> = ({ children }) => {
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
        <DmLink to={DAILY_LOG_PATH} style={{ width: '100%' }}>
          {t(routeTitles[DAILY_LOG_PATH])}
        </DmLink>
      ),
    },
    {
      key: 'log-type-category',
      icon: (
        <span role="img" aria-label="log-type-category">
          🎹
        </span>
      ),
      className: 'wrap',
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
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          Biểu đồ
        </DmLink>
      ),
    },
    {
      key: 'calendar',
      icon: (
        <span role="img" aria-label="calendar">
          📅
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          Lịch
        </DmLink>
      ),
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
