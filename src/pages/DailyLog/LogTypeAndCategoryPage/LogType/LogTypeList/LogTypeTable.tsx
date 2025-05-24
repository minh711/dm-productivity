import React from 'react';
import { Table, Checkbox, CheckboxChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { LogType } from '../../../../../api/models';
import LogTag from '../../../../../components/DailyLog/LogTag';

interface Props {
  data: LogType[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  onEdit: (logType: LogType) => void;
}

const LogTypeTable: React.FC<Props> = ({
  data,
  selectedIds,
  setSelectedIds,
  onEdit,
}) => {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < data.length;

  const onSelectAllChange = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? data.map((lt) => lt.id) : []);
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
      render: (_: any, record: LogType) => (
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
      render: (_: string, record: LogType) => (
        <div onClick={() => onEdit(record)}>
          <LogTag item={record}></LogTag>
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
      sorter: (a: LogType, b: LogType) => a.totalDuration - b.totalDuration,
      align: 'right' as const,
      render: (value: number) => <span>{value}</span>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: LogType, b: LogType) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      render: (value: string | Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      title: 'Finished At',
      dataIndex: 'finishedAt',
      key: 'finishedAt',
      sorter: (a: LogType, b: LogType) => {
        const aVal = a.finishedAt ? dayjs(a.finishedAt).valueOf() : 0;
        const bVal = b.finishedAt ? dayjs(b.finishedAt).valueOf() : 0;
        return aVal - bVal;
      },
      render: (value?: string | Date) =>
        value ? dayjs(value).format('YYYY-MM-DD') : '-',
    },
  ];

  return (
    <Table<LogType>
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default LogTypeTable;
