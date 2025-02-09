import { TableColumnsType } from 'antd';
import { LogType } from '../../../../api/models';
import dayjs from 'dayjs';

export const logTypeColumns: TableColumnsType<LogType> = [
  {
    title: 'name',
    dataIndex: 'name',
    align: 'center',
    width: 200,
    render: (_, record) => (
      <>
        <div
          style={{
            padding: '4px 16px',
            borderRadius: '16px',
            backgroundColor: record.color,
          }}
        >
          {record.name}
        </div>
      </>
    ),
  },
  {
    title: 'totalDuration',
    dataIndex: 'totalDuration',
    align: 'center',
    width: 140,
    render: (_) => <div className="text-right">{_}</div>,
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    width: 100,
    render: (_) => <div>{dayjs(_).format('YYYY-MM-DD')}</div>,
  },
  {
    title: 'finishedAt',
    dataIndex: 'finishedAt',
    align: 'center',
    width: 100,
  },
];
