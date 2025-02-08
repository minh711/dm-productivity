import { Card, Col, Row } from 'antd';
import React from 'react';

const DashboardPage = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card bordered={false}>
            <h2>Công việc hôm nay</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <h2>Chỉ tiêu hôm nay</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <h2>Đồng hồ bấm giờ</h2>
          </Card>
        </Col>

        <Col span={8}>
          <Card bordered={false}>
            <h2>Kế hoạch sắp tới</h2>
          </Card>
        </Col>
        <Col span={16}>
          <Card bordered={false}>
            <h2>Thống kê</h2>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
