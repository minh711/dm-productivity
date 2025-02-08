import React, { useEffect, useState } from 'react';
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
import {
  AppstoreOutlined,
  BellOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import { DAILY_LOG_PATH, routeTitles } from '../../constants';
import DraggableScroll from '../DraggableScroll';

const { Header } = Layout;
const { Option } = Select;

const DmHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    i18n.changeLanguage(savedLanguage);
    return savedLanguage;
  });

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    i18n.changeLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode');
    return savedDarkMode === 'true';
  });

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    document.body.classList.toggle('dark-mode', checked);
    localStorage.setItem('isDarkMode', checked.toString());
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const userMenu: MenuProps['items'] = [
    {
      key: 'darkmode',
      label: (
        <div
          className={classNames(styles.darkModeMenu)}
          onClick={(e) => e?.stopPropagation()}
        >
          <span>{t('darkMode')}</span>
          <Switch
            checked={isDarkMode}
            className={classNames('ms-m')}
            onChange={toggleDarkMode}
          />
        </div>
      ),
    },
    {
      key: 'selectLanguage',
      label: (
        <div onClick={(e) => e?.stopPropagation()}>
          <div className={classNames('mb-sm')}>{t('selectLanguage')}</div>
          <Select
            defaultValue={localStorage.getItem('selectedLanguage') || 'en'}
            style={{ width: '100%' }}
            onChange={handleLanguageChange}
            onClick={(e) => e?.stopPropagation()}
          >
            <Option value="en">{t('en')}</Option>
            <Option value="vn">{t('vn')}</Option>
          </Select>
        </div>
      ),
    },
  ];

  const [currentPageTitle, setCurrentPageTitle] = useState<string>('');

  useEffect(() => {
    const currentPath = location.pathname;
    setCurrentPageTitle(routeTitles[currentPath] || '');
  }, [location.pathname]); // Need location.pathname here to refresh in some case

  return (
    <Header className={classNames(styles.header)}>
      <div className={classNames(styles.title, 'font-serif font-bold')}>
        {t(currentPageTitle).toUpperCase()}
      </div>
      <div className={classNames('d-flex align-items-center')}>
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
              <Tooltip title="Nơi thư giãn...">
                <Button
                  className={styles.iconButton}
                  onClick={() => navigate(DAILY_LOG_PATH)}
                >
                  🖼️ Phòng trưng bày
                </Button>
              </Tooltip>
              <Tooltip title="Development in process...">
                <Button
                  className={styles.iconButton}
                  onClick={() => navigate(DAILY_LOG_PATH)}
                >
                  💣 More...
                </Button>
              </Tooltip>
            </div>
          </DraggableScroll>
        </div>

        <Dropdown
          menu={{
            items: [
              {
                key: 'daily-log',
                icon: (
                  <span
                    role="img"
                    aria-label="daily-log"
                    style={{ width: '32px', fontSize: '24px' }}
                  >
                    📝
                  </span>
                ),
                label: (
                  <div>
                    <h3>{t(routeTitles[DAILY_LOG_PATH])}</h3>
                    <div>{t('daily-log.description')}</div>
                  </div>
                ),
                onClick: () => navigate(DAILY_LOG_PATH),
              },
              {
                key: 'more',
                icon: (
                  <span
                    role="img"
                    aria-label="more"
                    style={{ width: '32px', fontSize: '24px' }}
                  >
                    💣
                  </span>
                ),
                label: (
                  <div>
                    <h3>More...</h3>
                    <div>Development in process...</div>
                  </div>
                ),
                onClick: () => navigate(DAILY_LOG_PATH),
              },
            ],
          }}
          trigger={['click']}
          className={(styles.appDropdown, 'me-sm')}
          placement="bottomRight"
        >
          <Button>
            <AppstoreOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          className={classNames('pointer')}
          menu={{ items: userMenu }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button>
            <SettingOutlined className={classNames(styles.dropdownIcon)} />
            <span className={classNames('ms-sm', styles.dropDownLabel)}>
              {t('settings')}
            </span>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default DmHeader;
