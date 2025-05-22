import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames';

const FullscreenLoading = ({ fadingOut = false }: { fadingOut?: boolean }) => {
  return (
    <div
      className={classNames(styles.overlay, { [styles.fadeOut]: fadingOut })}
    >
      {/* Add any loading indicator if needed */}
    </div>
  );
};

export default FullscreenLoading;
