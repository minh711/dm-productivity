import React, { useEffect, useState } from 'react';
import { Button, message, Select, Switch, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { AppSettingsRepository } from '../../api/repositories/appSettingsRepository';

const { Option } = Select;
const { Text } = Typography;

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  useEffect(() => {
    (async () => {
      const settings = await AppSettingsRepository.getSettings();
      const savedLanguage = settings?.selectedLanguage ?? 'en';
      const savedDarkMode = settings?.isDarkMode ?? false;

      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
      setIsDarkMode(savedDarkMode);
      document.body.classList.toggle('dark-mode', savedDarkMode);
    })();
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

  const handleUploadZip = async () => {
    setLoadingUpload(true);
    try {
      const result = await window.electron.loadZipData();
      if (result.success) {
        message.success(
          t('zipUploadSuccess') || 'Zip data loaded successfully!'
        );
      } else {
        message.error(
          result.message || t('zipUploadFailed') || 'Failed to load zip data.'
        );
      }
    } catch (error) {
      message.error(t('zipUploadFailed') || 'Failed to load zip data.');
      console.error(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleExportZip = async () => {
    setLoadingExport(true);
    try {
      const result = await window.electron.exportZipData();
      if (result.success) {
        message.success(
          t('zipExportSuccess') || `Zip exported to: ${result.filePath}`
        );
      } else {
        message.error(
          result.message || t('zipExportFailed') || 'Failed to export zip data.'
        );
      }
    } catch (error) {
      message.error(t('zipExportFailed') || 'Failed to export zip data.');
      console.error(error);
    } finally {
      setLoadingExport(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 300 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>{t('darkMode')}</div>
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
      </div>

      <div>
        <div>{t('selectLanguage')}</div>
        <Select
          value={selectedLanguage}
          style={{ width: '100%', marginTop: 8 }}
          onChange={handleLanguageChange}
          options={[
            { label: t('en'), value: 'en' },
            { label: t('vn'), value: 'vn' },
          ]}
        />
      </div>

      {/* Upload Zip Data Button */}
      <div style={{ marginTop: 32 }}>
        <Button
          type="primary"
          onClick={handleUploadZip}
          loading={loadingUpload}
          block
        >
          {t('uploadZipData') || 'Upload Zip Data'}
        </Button>
      </div>

      {/* Export Zip Data Button */}
      <div style={{ marginTop: 16 }}>
        <Button
          type="default"
          onClick={handleExportZip}
          loading={loadingExport}
          block
        >
          {t('exportZipData') || 'Export Zip Data'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
