import React, { useEffect, useState } from 'react';
import { Select, InputNumber, Button, Card, Input, Spin } from 'antd';
import classNames from 'classnames';
import styles from './style.module.css';
import { LogCategoryRepository } from '../../../../api/repositories/logCategoryRepository';
import { LogTypeRepository } from '../../../../api/repositories/logTypeRepository';
import { LogCategory, LogType } from '../../../../api/models';

const { Option } = Select;

interface MyData {
  key: string;
  type: string;
  category: string;
  duration: number;
  note: string;
}

interface Props {
  newRow: MyData;
  onChange: (field: keyof MyData, value: string | number) => void;
  onAdd: () => void;
}

const AddEditLogForm: React.FC<Props> = ({ newRow, onChange, onAdd }) => {
  const [logTypes, setLogTypes] = useState<LogType[]>([]);
  const [logCategories, setLogCategories] = useState<LogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allLogTypes = await LogTypeRepository.getAll();
      const allLogCategories = await LogCategoryRepository.getAll();

      setLogTypes(allLogTypes);
      setLogCategories(allLogCategories);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card
        className={classNames(styles.dropdownMenu, 'shadow')}
        style={{ width: '40vw', textAlign: 'center', padding: '40px 0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card
      className={classNames(styles.dropdownMenu, 'shadow')}
      style={{ width: '40vw' }}
      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicking inside
    >
      <div>
        <Select
          placeholder="Select Type"
          className="mb-sm"
          value={newRow.type || undefined}
          onChange={(value) => onChange('type', value)}
          showSearch
          filterOption={(input, option) =>
            option?.value != null &&
            option.value.toString().toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: '100%', marginBottom: 12 }}
        >
          {logTypes.map((lt) => (
            <Option key={lt.id} value={lt.name}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: lt.color,
                    marginRight: 8,
                  }}
                />
                {lt.name}
              </div>
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Select Category"
          className="mb-sm"
          value={newRow.category || undefined}
          onChange={(value) => onChange('category', value)}
          showSearch
          filterOption={(input, option) =>
            option?.value != null &&
            option.value.toString().toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: '100%', marginBottom: 12 }}
        >
          {logCategories.map((lc) => (
            <Option key={lc.id} value={lc.name}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: lc.color,
                    marginRight: 8,
                  }}
                />
                {lc.name}
              </div>
            </Option>
          ))}
        </Select>

        <InputNumber
          min={1}
          placeholder="Duration"
          className="mb-sm"
          style={{ width: '100%', marginBottom: 12 }}
          value={newRow.duration}
          onChange={(value) => onChange('duration', value ?? 0)}
        />

        <Input
          placeholder="Note"
          className="mb-sm"
          value={newRow.note}
          onChange={(e) => onChange('note', e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <Button onClick={onAdd} type="primary" block>
          Add Row
        </Button>
      </div>
    </Card>
  );
};

export default AddEditLogForm;
