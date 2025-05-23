import React from 'react';
import { Table, Checkbox, CheckboxChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { LogCategory } from '../../../../../api/models'; // Adjust path accordingly

interface Props {
  data: LogCategory[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  onEdit: (logCategory: LogCategory) => void;
}

const LogCategoryTable: React.FC<Props> = ({
  data,
  selectedIds,
  setSelectedIds,
  onEdit,
}) => {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < data.length;

  const onSelectAllChange = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? data.map((lc) => lc.id) : []);
  };

  const onSelectChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={indeterminate}
          onChange={onSelectAllChange}
          checked={allSelected}
        />
      ),
      dataIndex: 'select',
      width: 40,
      render: (_: any, record: LogCategory) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={(e) => onSelectChange(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 200,
      render: (_: string, record: LogCategory) => (
        <div
          style={{
            padding: '4px 16px',
            borderRadius: '16px',
            color: '#fff',
            backgroundColor: record.color,
            cursor: 'pointer',
          }}
          onClick={() => onEdit(record)}
        >
          {record.name}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Total Duration',
      dataIndex: 'totalDuration',
      key: 'totalDuration',
      sorter: (a: LogCategory, b: LogCategory) =>
        a.totalDuration - b.totalDuration,
      align: 'right' as const,
      render: (value: number) => <span>{value}</span>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: LogCategory, b: LogCategory) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      render: (value: string | Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      title: 'Finished At',
      dataIndex: 'finishedAt',
      key: 'finishedAt',
      sorter: (a: LogCategory, b: LogCategory) => {
        const aVal = a.finishedAt ? dayjs(a.finishedAt).valueOf() : 0;
        const bVal = b.finishedAt ? dayjs(b.finishedAt).valueOf() : 0;
        return aVal - bVal;
      },
      render: (value?: string | Date) =>
        value ? dayjs(value).format('YYYY-MM-DD') : '-',
    },
  ];

  return (
    <Table<LogCategory>
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default LogCategoryTable;
