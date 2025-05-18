import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import classNames from 'classnames';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface Props {
  items: MenuItem[];
  children: ReactNode;
  style?: React.CSSProperties;
}

const DmContextMenu: React.FC<Props> = ({ items, children, style }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLUListElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    const clickX = event.clientX;
    const clickY = event.clientY;

    setPosition({ x: clickX, y: clickY });
    setVisible(true);
  };

  useEffect(() => {
    if (visible && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();

      let newX = position.x;
      let newY = position.y;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      if (rect.right > screenW) {
        newX = Math.max(0, screenW - rect.width - 10);
      }

      if (rect.bottom > screenH) {
        newY = Math.max(0, screenH - rect.height - 10);
      }

      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [visible, position]);

  useEffect(() => {
    const handleClick = () => setVisible(false);
    const handleScroll = () => setVisible(false);

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className={classNames(styles.wrapper)}
        style={style}
      >
        {children}
      </div>

      {visible &&
        ReactDOM.createPortal(
          <ul
            ref={menuRef}
            className={classNames(styles.menu)}
            style={{ top: position.y, left: position.x, position: 'fixed' }}
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                className={classNames(styles.menuItem)}
                onClick={() => {
                  item.onClick();
                  setVisible(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};

export default DmContextMenu;
