import { Card, Col, Row } from 'antd';
import React from 'react';
import Timer from '../../../components/Timer';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]} align="stretch">
        <Col span={8}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Công việc hôm nay</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Chỉ tiêu hôm nay</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Đồng hồ bấm giờ</h2>
            <Timer />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Kế hoạch sắp tới</h2>
          </Card>
        </Col>
        <Col span={16}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Thống kê</h2>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
