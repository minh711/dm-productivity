import React from 'react';
import { useTranslation } from 'react-i18next';
import DraggableTable from '../../../components/DraggableTable';
import { Card, Col, Row, TableColumnsType, Tag } from 'antd';
import LogTypeList from './LogTypeList';

const LogTypePage = () => {
  const { t } = useTranslation();

  return (
    <>
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
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LogTypePage;
