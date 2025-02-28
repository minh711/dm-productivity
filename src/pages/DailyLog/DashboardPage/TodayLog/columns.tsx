import { TableColumnsType, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const myColumns: TableColumnsType<any> = [
  {
    title: 'Phân loại',
    dataIndex: 'type',
    width: 200,
    render: (_, record) => (
      <Tooltip title={record.type}>
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
      </Tooltip>
    ),
  },
  {
    title: 'Hạng mục',
    dataIndex: 'category',
    width: 200,
    render: (_, record) => (
      <Tooltip title={record.category}>
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
