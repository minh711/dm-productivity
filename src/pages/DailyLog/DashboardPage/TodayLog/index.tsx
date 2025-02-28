import React from 'react';
import DraggableTable from '../../../../components/DraggableTable';
import { TableColumnsType } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TodayLog = () => {
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
    {
      title: '',
      dataIndex: 'actions',
      align: 'center',
      width: 20,
      render: (_, record) => <DeleteOutlined />,
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

  return (
    <div>
      <DraggableTable<MyData> dataSource={myDataSource} columns={myColumns} />
    </div>
  );
};

export default TodayLog;
