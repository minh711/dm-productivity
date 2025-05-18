import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
import { HOME_PATH } from '../../../constants';
import useSession from '../../../hooks/useSession';

const { Sider } = Layout;

const DmSider: React.FC<any> = ({ menuItems }) => {
  // const { t } = useTranslation();

  const { role } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
        <span
          style={{
            fontSize: collapsed ? '18px' : '24px',
            fontWeight: 'bold',
            transition: 'font-size 0.3s ease',
            textWrap: 'nowrap',
          }}
        >
          🍇 {collapsed ? '' : ' DM Pro'}
        </span>
      </div>
      <Menu theme="light" mode="inline" items={menuItems} />
    </Sider>
  );
};

export default DmSider;
