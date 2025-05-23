import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DraggableTable from '../../../../components/General/DraggableTable';
import { myColumns } from './columns';
import AddEditLogForm from './AddEditLogForm'; // import new component

interface MyData {
  key: string;
  type: string;
  category: string;
  duration: number;
  note: string;
}

const TodayLog = () => {
  const [data, setData] = useState<MyData[]>([
    { key: '1', type: 'John', category: 'Work', duration: 30, note: 'Meeting' },
    { key: '2', type: 'Jane', category: 'Exercise', duration: 25, note: 'Gym' },
    { key: '3', type: 'Doe', category: 'Study', duration: 40, note: 'Reading' },
  ]);

  const [newRow, setNewRow] = useState<MyData>({
    key: '',
    type: '',
    category: '',
    duration: 0,
    note: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (field: keyof MyData, value: string | number) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };

  const addRow = () => {
    if (!newRow.type || !newRow.category || newRow.duration <= 0) return;
    const rowToAdd = { ...newRow, key: String(Date.now()) };
    setData((prev) => [...prev, rowToAdd]);
    setNewRow({ key: '', type: '', category: '', duration: 0, note: '' });
    setDropdownOpen(false);
  };

  return (
    <div>
      <Dropdown
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        trigger={['click']}
        dropdownRender={() => (
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
        dataSource={data}
        columns={myColumns}
        onSortEnd={setData}
      />
    </div>
  );
};

export default TodayLog;
