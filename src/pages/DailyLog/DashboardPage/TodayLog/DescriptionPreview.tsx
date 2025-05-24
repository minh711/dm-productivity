import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './style.module.css';

interface Props {
  html: string;
}

const DescriptionPreview: React.FC<Props> = ({ html }) => {
  const [hovered, setHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const delayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hovered) {
      delayTimer.current = setTimeout(() => {
        if (previewRef.current) {
          const rect = previewRef.current.getBoundingClientRect();
          setPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
        setShowOverlay(true);
      }, 400);
    } else {
      if (delayTimer.current) clearTimeout(delayTimer.current);
      setShowOverlay(false);
    }

    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
    };
  }, [hovered]);

  return (
    <>
      <div
        ref={previewRef}
        className={styles.preview}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {showOverlay &&
        ReactDOM.createPortal(
          <div
            className={classNames(styles.overlay, {
              [styles.overlayVisible]: showOverlay,
            })}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            dangerouslySetInnerHTML={{ __html: html }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />,
          document.body
        )}
    </>
  );
};

export default DescriptionPreview;
