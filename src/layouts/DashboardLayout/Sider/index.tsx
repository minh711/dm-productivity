import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreAddOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
import { HOME_PATH, roles, routeTitles } from '../../../constants';
import useSession from '../../../hooks/useSession';

const { Sider } = Layout;

const DashboardSider: React.FC = () => {
  // const { t } = useTranslation();

  const { role } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const adminMenuItems = [
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

  let menuItems: any = [];

  switch (role) {
    case roles.ADMIN:
      menuItems = adminMenuItems;
      break;
    default:
      menuItems = [];
      break;
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      width={240}
      style={{
        minHeight: '100vh',
        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
        userSelect: 'none',
      }}
    >
      <div
        className="logo"
        style={{
          cursor: 'pointer',
          height: collapsed ? '24px' : '32px',
          margin: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'height 0.3s ease',
        }}
        onClick={() => navigate(HOME_PATH)}
      >
        <AppstoreAddOutlined
          style={{
            fontSize: collapsed ? '18px' : '24px',
            transition: 'font-size 0.3s ease',
          }}
        />
      </div>
      <Menu theme="light" mode="inline" items={menuItems} />
    </Sider>
  );
};

export default DashboardSider;
