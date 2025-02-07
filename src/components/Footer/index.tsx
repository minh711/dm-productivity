// src/components/DashboardLayout/Footer.tsx
import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

import styles from './style.module.css';

const { Footer } = Layout;

const DmFooter: React.FC = () => {
  return (
    <Footer
      className={classNames(styles.footer)}
      style={{ textAlign: 'center' }}
    >
      ©2025 Vite template by{' '}
      <a target="_blank" href="https://github.com/minh711">
        minh711 (dm711)
      </a>
    </Footer>
  );
};

export default DmFooter;
