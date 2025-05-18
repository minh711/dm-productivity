import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
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
  VerifiedOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import { DAILY_LOG_PATH, routeTitles, SETTINGS_PATH } from '../../../constants';
import AppIcons from './AppIcons';
import { AppSettingsRepository } from '../../../api/repositories/appSettingsRepository';
import NavigationControls from '../../NavigationControls';
import DmLink from '../DmLink';

const { Header } = Layout;
const { Option } = Select;

const DmHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await AppSettingsRepository.getSettings();
      const savedLanguage = settings?.selectedLanguage ?? 'en';
      const savedDarkMode = settings?.isDarkMode ?? false;

      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
      setIsDarkMode(savedDarkMode);
      document.documentElement.classList.toggle('dark-mode', savedDarkMode);
    };

    fetchSettings();
  }, [i18n]);

  const handleLanguageChange = async (lang: string) => {
    const currentSettings = await AppSettingsRepository.getSettings();
    const updatedSettings = { ...currentSettings, selectedLanguage: lang };
    await AppSettingsRepository.setSettings(updatedSettings);

    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleDarkMode = async (checked: boolean) => {
    setIsDarkMode(checked);
    document.body.classList.toggle('dark-mode', checked);

    const currentSettings = await AppSettingsRepository.getSettings();
    const updatedSettings = { ...currentSettings, isDarkMode: checked };
    await AppSettingsRepository.setSettings(updatedSettings);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const settingsMenu: MenuProps['items'] = [
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
    {
      key: 'moreSettings',
      label: (
        <DmLink to={SETTINGS_PATH} style={{ width: '100%' }}>
          <Button style={{ width: '100%' }}>{t('more-settings')}</Button>
        </DmLink>
      ),
    },
  ];

  const [currentPageTitle, setCurrentPageTitle] = useState<string>('');

  useEffect(() => {
    const updateTitle = () => {
      let currentPath = window.location.hash.replace('#', '') || '/';
      if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
      }

      let title = routeTitles[currentPath];

      // If title is undefined, try removing the last segment (assuming it's a UUID or dynamic ID)
      if (!title) {
        const modifiedPath = currentPath.replace(/\/[^/]+$/, ''); // Remove the last segment
        title = routeTitles[modifiedPath];
      }

      setCurrentPageTitle(title || '');
    };

    updateTitle();

    window.addEventListener('hashchange', updateTitle);
    return () => window.removeEventListener('hashchange', updateTitle);
  }, []);

  return (
    <Header className={classNames(styles.header)}>
      <div className={classNames('d-flex align-items-center')}>
        <div className={classNames('ms-sm')}>
          <NavigationControls />
        </div>

        <Divider type="vertical" style={{ height: '40px' }} />

        <div className={classNames(styles.title, 'font-serif font-bold')}>
          {t(currentPageTitle).toUpperCase()}
        </div>
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
          menu={{ items: settingsMenu }}
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
