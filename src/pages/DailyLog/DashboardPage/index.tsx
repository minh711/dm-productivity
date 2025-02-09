import { Card, Col, Row, TableColumnsType, Tabs } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Timer from '../../../components/Timer';
import { useTranslation } from 'react-i18next';
import DraggableTable from '../../../components/DraggableTable';
import TabPane from 'antd/es/tabs/TabPane';

const DashboardPage = () => {
  const { t } = useTranslation();

  interface MyData {
    key: string;
    type: string;
    category: string;
    duration: number;
    note: string;
  }

  const myColumns: TableColumnsType<MyData> = [
    {
      title: 'Phân loại',
      dataIndex: 'type',
      render: (_, record) => (
        <div className="d-flex align-items-center justify-content-between">
          <div
            style={{
              padding: '4px 16px',
              borderRadius: '16px',
              backgroundColor: 'pink',
              flex: '1',
            }}
          >
            {record.type}
          </div>
          <div className="ms-sm">⭕</div>
        </div>
      ),
    },
    {
      title: 'Hạng mục',
      dataIndex: 'category',
      render: (_, record) => (
        <div className="d-flex align-items-center justify-content-between">
          <div
            style={{
              padding: '4px 16px',
              borderRadius: '16px',
              backgroundColor: 'pink',
              flex: '1',
            }}
          >
            {record.category}
          </div>
          <div className="ms-sm">⭕</div>
        </div>
      ),
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
    },
  ];

  const myDataSource: MyData[] = [
    {
      key: '1',
      type: 'John',
      category: 'John',
      duration: 30,
      note: '123 Main St',
    },
    {
      key: '2',
      type: 'Jane',
      category: 'John',
      duration: 25,
      note: '456 Oak St',
    },
    {
      key: '3',
      type: 'Doe',
      category: 'John',
      duration: 40,
      note: '789 Pine St',
    },
  ];

  const localizer = dayjsLocalizer(dayjs);

  const events = [
    {
      title: 'Multi-Day Event',
      start: dayjs().toDate(),
      end: dayjs().add(3, 'day').toDate(),
    },
    {
      title: 'Another Long Event',
      start: dayjs().add(5, 'day').toDate(),
      end: dayjs().add(8, 'day').toDate(),
    },
    {
      title: 'Single Day Event',
      start: dayjs().add(10, 'day').toDate(),
      end: dayjs().add(10, 'day').toDate(),
    },
  ];

  const generateData = () => {
    const daysInMonth = dayjs().daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
      return {
        date: dayjs()
          .date(i + 1)
          .format('YYYY-MM-DD'),
        categoryA: Math.floor(Math.random() * 4),
        categoryB: Math.floor(Math.random() * 4),
        categoryC: Math.floor(Math.random() * 4),
      };
    });
  };

  const data = generateData();

  return (
    <>
      <Row gutter={[16, 16]} align="stretch">
        <Col span={12}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Công việc hôm nay</h2>

            <DraggableTable<MyData>
              dataSource={myDataSource}
              columns={myColumns}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Chỉ tiêu hôm nay</h2>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Đồng hồ bấm giờ</h2>
            <Timer />
          </Card>
        </Col>

        <Col span={14}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Thống kê</h2>

            <Tabs defaultActiveKey="chart">
              <TabPane tab="Biểu đồ" key="chart">
                <Card
                  className="d-flex justify-content-center align-item-center"
                  style={{ overflowX: 'auto' }}
                >
                  <div
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      overflowX: 'auto',
                      height: 640,
                    }}
                  >
                    <ResponsiveContainer width={800} height={600}>
                      <BarChart
                        data={data}
                        margin={{ left: 0, top: 40, bottom: 40 }}
                      >
                        <text
                          x="50%"
                          y="20"
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Thống kê trong tháng này
                        </text>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis
                          dataKey="date"
                          angle={-90}
                          textAnchor="end"
                          interval={0}
                          tick={{ fontSize: 12, fontFamily: 'sans-serif' }}
                        />
                        <YAxis
                          width={20}
                          tick={{ fontSize: 12, fontFamily: 'sans-serif' }}
                        />
                        <Tooltip />
                        <Bar dataKey="categoryA" stackId="a" fill="#8884d8" />
                        <Bar dataKey="categoryB" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="categoryC" stackId="a" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabPane>
              <TabPane tab="Lịch" key="calendar"></TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={10}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Kế hoạch sắp tới</h2>

            <Card className="d-flex justify-content-center align-item-center">
              <div style={{ height: 600 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                />
              </div>
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
