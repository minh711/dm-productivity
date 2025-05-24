import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DraggableTable from '../../../../components/General/DraggableTable';
import { myColumns } from './columns';
import AddEditLogForm from './AddEditLogForm';
import { Log } from '../../../../api/models'; // Use Log interface

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

      <DraggableTable
        dataSource={data.map((item) => ({
          ...item,
          key: item.id,
        }))}
        columns={myColumns}
        onSortEnd={setData}
      />
    </div>
  );
};

export default TodayLog;
