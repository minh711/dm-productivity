import React from 'react';
import { Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.module.css';

const NavigationControls: React.FC = () => {
  return (
    <div className={classNames(styles.menu)}>
      <Tooltip title="Go Back" placement="topLeft">
        <Button
          icon={<LeftOutlined />}
          onClick={() => window.electron.goBack()}
          className="me-sm"
          style={{ borderRadius: '50%' }}
        />
      </Tooltip>
      <Tooltip title="Go Forward" placement="topLeft">
        <Button
          icon={<RightOutlined />}
          onClick={() => window.electron.goForward()}
          style={{ borderRadius: '50%' }}
        />
      </Tooltip>
    </div>
  );
};

export default NavigationControls;
