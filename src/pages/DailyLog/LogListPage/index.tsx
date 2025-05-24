import React, { useEffect, useState } from 'react';
import { DatePicker, Typography, Tag, Card, Space, Divider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LogRepository } from '../../../api/repositories/logRepository';
import LogTag from '../../../components/DailyLog/LogTag';
import DescriptionPreview from '../DashboardPage/TodayLog/DescriptionPreview';
import { Log } from '../../../api/models';

const { Title, Text } = Typography;

type GroupedLogs = {
  [date: string]: Log[];
};

const LogListPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const [groupedLogs, setGroupedLogs] = useState<GroupedLogs>({});

  useEffect(() => {
    (async () => {
      const data = await LogRepository.getAllByMonth(selectedMonth.toDate());
      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Group logs by date (DD/MM/YYYY)
      const grouped = data.reduce<GroupedLogs>((acc, log) => {
        const dateKey = dayjs(log.date).format('DD/MM/YYYY');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(log);
        return acc;
      }, {});

      setGroupedLogs(grouped);
    })();
  }, [selectedMonth]);

  return (
    <div>
      <Title level={3}>Logs theo tháng</Title>

      <DatePicker
        picker="month"
        value={selectedMonth}
        onChange={(value) => {
          if (value) setSelectedMonth(value);
        }}
        style={{ marginBottom: 24 }}
      />

      <Space direction="vertical" style={{ width: '100%' }}>
        {Object.entries(groupedLogs).map(([date, logs]) => (
          <div key={date}>
            <Text strong style={{ fontSize: 16 }}>
              {date}
            </Text>

            <Space direction="vertical" style={{ width: '100%' }}>
              {logs.map((log) => (
                <Card key={log.id} style={{ width: '100%' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Text type="secondary">Thời lượng</Text>
                    <Text>{log.duration} phút</Text>
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    {log.logType ? (
                      <LogTag item={log.logType} />
                    ) : (
                      <Tag color="default">Loại?</Tag>
                    )}
                    {log.logCategory ? (
                      <LogTag item={log.logCategory} />
                    ) : (
                      <Tag color="default">Hạng mục?</Tag>
                    )}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <DescriptionPreview html={log.description} />
                  </div>
                </Card>
              ))}
            </Space>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default LogListPage;
