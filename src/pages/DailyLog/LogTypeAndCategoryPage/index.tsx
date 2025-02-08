import React from 'react';
import { useTranslation } from 'react-i18next';
import DraggableTable from '../../../components/DraggableTable';
import { TableColumnsType } from 'antd';

const LogTypePage = () => {
  const { t } = useTranslation();

  interface MyData {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const myColumns: TableColumnsType<MyData> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const myDataSource: MyData[] = [
    { key: '1', name: 'John', age: 30, address: '123 Main St' },
    { key: '2', name: 'Jane', age: 25, address: '456 Oak St' },
    { key: '3', name: 'Doe', age: 40, address: '789 Pine St' },
  ];

  return (
    <>
      <DraggableTable<MyData> dataSource={myDataSource} columns={myColumns} />
    </>
  );
};

export default LogTypePage;
