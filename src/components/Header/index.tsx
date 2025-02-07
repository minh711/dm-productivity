import React, { useEffect, useState } from 'react';
import { Layout, Select } from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
// import { useTranslation } from 'react-i18next';
import { routeTitles } from '../../constants';
import useSession from '../../hooks/useSession';

const { Header } = Layout;

const DmHeader: React.FC = () => {
  // const { t, i18n } = useTranslation();

  // const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
  //   const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  //   i18n.changeLanguage(savedLanguage);
  //   return savedLanguage;
  // });

  // const handleLanguageChange = (lang: string) => {
  //   setSelectedLanguage(lang);
  //   localStorage.setItem('selectedLanguage', lang);
  //   i18n.changeLanguage(lang);
  //   console.log(`Language changed to: ${lang}`);
  // };

  // const toggleDarkMode = (checked: boolean) => {
  //   setIsDarkMode(checked);
  //   document.body.classList.toggle('dark-mode', checked);
  //   localStorage.setItem('isDarkMode', checked.toString());
  // };

  // useEffect(() => {
  //   document.body.classList.toggle('dark-mode', isDarkMode);
  // }, [isDarkMode]);

  const [currentPageTitle, setCurrentPageTitle] = useState<string>('');

  useEffect(() => {
    const currentPath = location.pathname;
    setCurrentPageTitle(routeTitles[currentPath] || '');
  }, []);

  return (
    <Header className={classNames(styles.header)}>
      <div className={classNames(styles.title)}>
        {currentPageTitle.toUpperCase()}
      </div>
      <div>{/* More items here */}</div>
    </Header>
  );
};

export default DmHeader;
