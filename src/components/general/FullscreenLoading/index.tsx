import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FullscreenLoading: React.FC = () => {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);

      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 500);

      return () => clearTimeout(hideTimer);
    }, 500);

    return () => clearTimeout(fadeTimer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={classNames(
        'd-flex justify-content-center align-items-center',
        styles.overlay,
        { [styles.fadeOut]: fadingOut }
      )}
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default FullscreenLoading;
