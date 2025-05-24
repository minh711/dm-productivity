import React, { useEffect, useState } from 'react';
import { Button, Dropdown, TableColumnsType, Tooltip } from 'antd';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import DraggableTable from '../../../../components/General/DraggableTable';
import AddEditLogForm from './AddEditLogForm';
import { Log } from '../../../../api/models'; // Use Log interface
import LogTag from '../../../../components/DailyLog/LogTag';
import DescriptionPreview from './DescriptionPreview';
import { LogRepository } from '../../../../api/repositories/logRepository';
import { v4 as uuidv4 } from 'uuid';

const TodayLog = () => {
  const [data, setData] = useState<Log[]>([]);

  const [newRow, setNewRow] = useState<Log>({
    id: '',
    date: new Date(),
    duration: 0,
    description: '',
    logTypeId: '',
    logCategoryId: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const today = new Date();
      const logs = await LogRepository.getAllByDate(today);
      logs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      console.log('Logs', logs);

      setData(logs);
    })();
  }, []);

  const handleInputChange = (field: keyof Log, value: string | number) => {
    setNewRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRow = async () => {
    if (!newRow.logTypeId || !newRow.logCategoryId || newRow.duration < 0)
      return;

    const rowToAdd: Log = {
      ...newRow,
      id: uuidv4(),
      date: new Date(),
      order: data.length,
    };

    await LogRepository.add(rowToAdd);
    setData((prev) => [...prev, rowToAdd]);

    setNewRow({
      id: '',
      date: new Date(),
      duration: 0,
      description: '',
      logTypeId: '',
      logCategoryId: '',
    });

    setDropdownOpen(false);
  };

  const handleDelete = async (id: string, date: Date) => {
    await LogRepository.delete(id, date);
    setData((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSortEnd = async (newArr: Log[]) => {
    setData(newArr);

    console.log('New array', newArr);

    for (const log of newArr) {
      await LogRepository.update(log);
    }
  };

  const myColumns: TableColumnsType<any> = [
    {
      title: 'Phân loại',
      dataIndex: 'type',
      align: 'center',
      width: 140,
      render: (_, record) => <LogTag item={record.logType}></LogTag>,
    },
    {
      title: 'Hạng mục',
      dataIndex: 'category',
      align: 'center',
      width: 140,
      render: (_, record) => <LogTag item={record.logCategory}></LogTag>,
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
      align: 'center',
      width: 80,
      render: (duration: number) => (
        <div className="text-right">{duration}</div>
      ),
    },
    {
      title: 'Chi tiết',
      dataIndex: 'description',
      align: 'center',
      width: 200,
      render: (html: string) => <DescriptionPreview html={html} />,
    },
    {
      title: '',
      dataIndex: 'actions',
      align: 'center',
      width: 20,
      render: (_, record) => (
        <Tooltip title="Delete">
          <DeleteOutlined
            onClick={() => handleDelete(record.id, record.date)}
            style={{ color: 'red', cursor: 'pointer' }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Dropdown
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        trigger={['click']}
        popupRender={() => (
          <AddEditLogForm
            newRow={newRow}
            onChange={handleInputChange}
            onAdd={addRow}
          />
        )}
        placement="bottomLeft"
      >
        <Button className="mb-sm">
          Add Row <DownOutlined />
        </Button>
      </Dropdown>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 720, minHeight: 400 }}>
          <DraggableTable
            hoverPointer={true}
            onRowClick={(record: any) => {
              console.log('fuck', record);
            }}
            dataSource={data.map((item) => ({
              ...item,
              key: item.id,
            }))}
            columns={myColumns}
            onSortEnd={handleSortEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayLog;
