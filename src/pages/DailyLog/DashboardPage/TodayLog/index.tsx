import React, { useState } from 'react';
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Row,
  Col,
  Space,
  Card,
  Form,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DraggableTable from '../../../../components/general/DraggableTable';
import { myColumns } from './columns';
import styles from './style.module.css';
import classNames from 'classnames';

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

  const dropdownMenu = (
    <Card
      className={classNames(styles.dropdownMenu, 'shadow')}
      style={{ width: '40vw' }}
      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicking inside
    >
      <div>
        <Input
          placeholder="Type"
          className="mb-sm"
          value={newRow.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        />

        <Input
          placeholder="Category"
          className="mb-sm"
          value={newRow.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
        />

        <InputNumber
          min={1}
          placeholder="Duration"
          className="mb-sm"
          style={{ width: '100%' }}
          value={newRow.duration}
          onChange={(value) => handleInputChange('duration', value ?? 0)}
        />

        <Input
          placeholder="Note"
          className="mb-sm"
          value={newRow.note}
          onChange={(e) => handleInputChange('note', e.target.value)}
        />

        <Button onClick={addRow}>Add Row</Button>
      </div>
    </Card>
  );

  return (
    <div>
      <Dropdown
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        trigger={['click']}
        dropdownRender={() => dropdownMenu}
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
