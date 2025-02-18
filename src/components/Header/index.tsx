import React, { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Select,
  Switch,
  Tooltip,
} from 'antd';
import {
  AppstoreFilled,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import { DAILY_LOG_PATH, routeTitles } from '../../constants';
import AppIcons from './AppIcons';
import { AppSettingsRepository } from '../../api/repositories/appSettingsRepository';

const { Header } = Layout;
const { Option } = Select;

const DmHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    const fetchLanguage = async () => {
      const savedLanguage =
        (await AppSettingsRepository.getSettings())?.selectedLanguage ?? 'en';
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    };
    fetchLanguage();
  }, []);

  const handleLanguageChange = async (lang: string) => {
    const currentSettings = await AppSettingsRepository.getSettings();
    const updatedSettings = { ...currentSettings, selectedLanguage: lang };
    await AppSettingsRepository.setSettings(updatedSettings);
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
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
            value={selectedLanguage}
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
        <AppIcons />

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
          <Tooltip title="All apps">
            <Button>
              <AppstoreFilled />
            </Button>
          </Tooltip>
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
