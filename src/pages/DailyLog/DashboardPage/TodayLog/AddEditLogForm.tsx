import React, { useEffect, useState } from 'react';
import { Select, InputNumber, Button, Card, Input, Spin, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './style.module.css';
import { LogCategoryRepository } from '../../../../api/repositories/logCategoryRepository';
import { LogTypeRepository } from '../../../../api/repositories/logTypeRepository';
import { Log, LogCategory, LogType } from '../../../../api/models';
import LogTag from '../../../../components/DailyLog/LogTag';
import RichTextEditor from '../../../../components/General/RichTextEditor';

const { Option } = Select;

interface Props {
  row: Log;
  onChange: (field: keyof Log, value: any) => void;
  onSubmit: () => void;
}

const AddEditLogForm: React.FC<Props> = ({ row, onChange, onSubmit }) => {
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
      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicking inside
    >
      <div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Select
              placeholder="Select Type"
              className="mb-sm"
              value={row.logTypeId || undefined}
              onChange={(value) => {
                const selectedType = logTypes.find((lt) => lt.id === value);
                if (selectedType) {
                  onChange('logTypeId', selectedType.id);
                  onChange('logType', selectedType);
                }
              }}
              showSearch
              filterOption={(input, option) =>
                option?.value != null &&
                option.value
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: '100%', marginBottom: 12 }}
            >
              {logTypes.map((lt) => (
                <Option key={lt.id} value={lt.id}>
                  <LogTag item={lt}></LogTag>
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select Category"
              className="mb-sm"
              value={row.logCategoryId || undefined}
              onChange={(value) => {
                const selectedCategory = logCategories.find(
                  (lc) => lc.id === value
                );
                if (selectedCategory) {
                  onChange('logCategoryId', selectedCategory.id);
                  onChange('logCategory', selectedCategory);
                }
              }}
              showSearch
              filterOption={(input, option) =>
                option?.value != null &&
                option.value
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: '100%', padding: 0, marginBottom: 12 }}
            >
              {logCategories.map((lc) => (
                <Option key={lc.id} value={lc.id}>
                  <LogTag item={lc}></LogTag>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <InputNumber
          min={0}
          placeholder="Duration"
          className="mb-sm"
          style={{ width: '100%', marginBottom: 12 }}
          value={row.duration ?? 0}
          onChange={(value) => onChange('duration', value ?? 0)}
        />

        <div className="mb-m">
          <RichTextEditor
            value={row.description || ''}
            onChange={(value) => onChange('description', value)}
            isSerif={false} // or true if you want serif font
          />
        </div>

        <Button onClick={onSubmit} type="primary" block>
          Add Row
        </Button>
      </div>
    </Card>
  );
};

export default AddEditLogForm;
