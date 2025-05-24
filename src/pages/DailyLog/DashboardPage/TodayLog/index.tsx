import React, { useState } from 'react';
import { Button, Dropdown, TableColumnsType, Tooltip } from 'antd';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import DraggableTable from '../../../../components/General/DraggableTable';
import AddEditLogForm from './AddEditLogForm';
import { Log } from '../../../../api/models'; // Use Log interface
import LogTag from '../../../../components/DailyLog/LogTag';
import DescriptionPreview from './DescriptionPreview';

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

  const handleInputChange = (field: keyof Log, value: string | number) => {
    setNewRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRow = () => {
    if (!newRow.logTypeId || !newRow.logCategoryId || newRow.duration <= 0)
      return;

    console.log('New row', newRow);

    const rowToAdd: Log = {
      ...newRow,
      id: String(Date.now()),
      date: new Date(),
    };

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
      render: (_, record) => <DeleteOutlined />,
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
            dataSource={data.map((item) => ({
              ...item,
              key: item.id,
            }))}
            columns={myColumns}
            onSortEnd={setData}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayLog;
