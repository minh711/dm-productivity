import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames';

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
      className={classNames(styles.overlay, { [styles.fadeOut]: fadingOut })}
    >
      <h1>Loading</h1>
    </div>
  );
};

export default FullscreenLoading;
