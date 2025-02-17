import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'antd';
import LogCategoryList from './LogCategory/LogCategoryList';
import LogTypeList from './LogType/LogTypeList';
import FileUploader from '../../../components/FileUploader';

const LogTypePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <FileUploader />

      <Row gutter={[16, 16]} align={'stretch'}>
        <Col span={12}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>{t('daily-log.log-type-category.log-type.title')}</h2>

            <LogTypeList />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>{t('daily-log.log-type-category.log-category.title')}</h2>

            <LogCategoryList />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LogTypePage;
