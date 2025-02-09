import React from 'react';
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Select,
  Switch,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import DraggableScroll from '../DraggableScroll';
import { DAILY_LOG_PATH, routeTitles } from '../../constants';

const AppIcons = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={(styles.appIconsContainer, 'me-sm')}>
      <DraggableScroll maxWidth="40vw">
        <div className={styles.iconGroup}>
          <div className="font-bold font-16 text-highlight ani-jump-text">
            {t('explores')
              .split('')
              .map((char, index) => (
                <span
                  key={index}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
          </div>

          <Tooltip title={t('daily-log.description')}>
            <Button
              className={styles.iconButton}
              onClick={() => navigate(DAILY_LOG_PATH)}
            >
              📝 {t(routeTitles[DAILY_LOG_PATH])}
            </Button>
          </Tooltip>
          <Tooltip title="Development in process...">
            <Button
              className={styles.iconButton}
              onClick={() => navigate(DAILY_LOG_PATH)}
            >
              🌱 Lập kế hoạch
            </Button>
          </Tooltip>
          <Tooltip title="Development in process...">
            <Button
              className={styles.iconButton}
              onClick={() => navigate(DAILY_LOG_PATH)}
            >
              💵 Tài chính
            </Button>
          </Tooltip>
          <Tooltip title="Development in process...">
            <Button
              className={styles.iconButton}
              onClick={() => navigate(DAILY_LOG_PATH)}
            >
              💻 Thiết kế phần mềm
            </Button>
          </Tooltip>
          <Tooltip title="Nơi thư giãn...">
            <Button
              className={styles.iconButton}
              onClick={() => navigate(DAILY_LOG_PATH)}
            >
              🖼️ Phòng trưng bày
            </Button>
          </Tooltip>
        </div>
      </DraggableScroll>
    </div>
  );
};

export default AppIcons;
