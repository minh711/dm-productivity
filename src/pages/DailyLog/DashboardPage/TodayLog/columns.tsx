import { TableColumnsType, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import LogTag from '../../../../components/DailyLog/LogTag';

export const myColumns: TableColumnsType<any> = [
  {
    title: 'Phân loại',
    dataIndex: 'type',
    width: 200,
    render: (_, record) => (
      <Tooltip title={record.logType.name}>
        <LogTag item={record.logType}></LogTag>
      </Tooltip>
    ),
  },
  {
    title: 'Hạng mục',
    dataIndex: 'category',
    width: 200,
    render: (_, record) => (
      <Tooltip title={record.logCategory.name}>
        <LogTag item={record.logCategory}></LogTag>
      </Tooltip>
    ),
  },
  {
    title: 'Thời lượng',
    dataIndex: 'duration',
    width: 100,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    width: 100,
  },
  {
    title: '',
    dataIndex: 'actions',
    align: 'center',
    width: 20,
    render: (_, record) => <DeleteOutlined />,
  },
];
