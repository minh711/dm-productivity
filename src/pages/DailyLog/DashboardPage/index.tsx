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
import Timer from '../../../components/DailyLog/Timer';
import { useTranslation } from 'react-i18next';
import TabPane from 'antd/es/tabs/TabPane';
import TodayLog from './TodayLog';
import DashboardCalendar from './DashboardCalendar';

const DashboardPage = () => {
  const { t } = useTranslation();

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
        <Col lg={6} md={24}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Đồng hồ bấm giờ</h2>
            <Timer />
          </Card>
        </Col>

        <Col lg={6} md={24}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Chỉ tiêu hôm nay</h2>
          </Card>
        </Col>

        <Col lg={12} md={24}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Công việc hôm nay</h2>

            <TodayLog />
          </Card>
        </Col>

        <Col span={10}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Kế hoạch sắp tới</h2>

            {/* <Card className="d-flex justify-content-center align-item-center"> */}
            {/* <div style={{ height: 600 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                />
              </div> */}
            {/* </Card> */}
          </Card>
        </Col>

        <Col span={14}>
          <Card bordered={false} style={{ height: '100%' }}>
            <h2>Thống kê</h2>

            <Tabs defaultActiveKey="chart" type="card">
              <TabPane tab="Biểu đồ" key="chart">
                <Card>
                  <div className="d-flex justify-content-center align-items-center">
                    <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                      <div>
                        <ResponsiveContainer width={840} height={600}>
                          <BarChart
                            data={data}
                            margin={{ left: -24, top: 80, bottom: 60 }}
                            barCategoryGap={5}
                          >
                            <text
                              x="50%"
                              y="48"
                              textAnchor="middle"
                              fontSize="16"
                              fontWeight="bold"
                            >
                              Thống kê tháng này
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
                              width={50}
                              tick={{ fontSize: 12, fontFamily: 'sans-serif' }}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="categoryA"
                              stackId="a"
                              fill="#8884d8"
                            />
                            <Bar
                              dataKey="categoryB"
                              stackId="a"
                              fill="#82ca9d"
                            />
                            <Bar
                              dataKey="categoryC"
                              stackId="a"
                              fill="#ffc658"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tab="Lịch" key="calendar">
                <DashboardCalendar />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
