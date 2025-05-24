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
import DmFooter from '../../components/General/DmFooter';
import DmHeader from '../../components/General/DmHeader';
import DmSider from '../../components/General/Sider';
import React, { ReactNode } from 'react';
import DmLink from '../../components/General/DmLink';

const { Content } = Layout;

interface DailyLogLayoutProps {
  children?: ReactNode;
}

const DailyLogLayout: React.FC<DailyLogLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: DAILY_LOG_PATH,
      icon: (
        <span role="img" aria-label="dashboard">
          <DmLink to={DAILY_LOG_PATH}>📝</DmLink>
        </span>
      ),
      label: (
        <DmLink to={DAILY_LOG_PATH} style={{ width: '100%' }}>
          {t(routeTitles[DAILY_LOG_PATH])}
        </DmLink>
      ),
      onClick: () => navigate(DAILY_LOG_PATH),
    },
    {
      key: LOG_TYPE_AND_CATEGORY_PATH,
      icon: (
        <span role="img" aria-label="log-type-category">
          <DmLink to={LOG_TYPE_AND_CATEGORY_PATH}>🎹</DmLink>
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          {t(routeTitles[LOG_TYPE_AND_CATEGORY_PATH])}
        </DmLink>
      ),
      onClick: () => navigate(LOG_TYPE_AND_CATEGORY_PATH),
    },
    {
      key: 'chart',
      icon: (
        <span role="img" aria-label="chart">
          <DmLink to={LOG_TYPE_AND_CATEGORY_PATH}>📊</DmLink>
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          Biểu đồ
        </DmLink>
      ),
      onClick: () => navigate(LOG_TYPE_AND_CATEGORY_PATH),
    },
    {
      key: 'calendar',
      icon: (
        <span role="img" aria-label="calendar">
          <DmLink to={LOG_TYPE_AND_CATEGORY_PATH}>📅</DmLink>
        </span>
      ),
      className: 'wrap',
      label: (
        <DmLink to={LOG_TYPE_AND_CATEGORY_PATH} style={{ width: '100%' }}>
          Lịch
        </DmLink>
      ),
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
