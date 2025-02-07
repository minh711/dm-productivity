import React, { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Select,
  Switch,
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
import { routeTitles } from '../../constants';

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
  }, []);

  return (
    <Header className={classNames(styles.header)}>
      <div className={classNames(styles.title)}>
        {t(currentPageTitle).toUpperCase()}
      </div>
      <div className={classNames('d-flex align-items-center')}>
        <div className={(styles.appIconsContainer, 'me-sm')}>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'app1',
                  icon: <AppstoreOutlined />,
                  label: t('App 1'),
                  onClick: () => navigate('/app1'),
                },
                {
                  key: 'app2',
                  icon: <MessageOutlined />,
                  label: t('App 2'),
                  onClick: () => navigate('/app2'),
                },
                {
                  key: 'app3',
                  icon: <BellOutlined />,
                  label: t('App 3'),
                  onClick: () => navigate('/app3'),
                },
              ],
            }}
            trigger={['click']}
            className={styles.appDropdown}
            placement="bottomRight"
          >
            <Button>
              <AppstoreOutlined />
            </Button>
          </Dropdown>

          <div className={styles.iconGroup}>
            <Button
              className={styles.iconButton}
              icon={<AppstoreOutlined />}
              onClick={() => navigate('/app1')}
            />
            <Button
              className={styles.iconButton}
              icon={<MessageOutlined />}
              onClick={() => navigate('/app2')}
            />
            <Button
              className={styles.iconButton}
              icon={<BellOutlined />}
              onClick={() => navigate('/app3')}
            />
          </div>
        </div>

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
