import React from 'react';
import { Button, Dropdown, Input, DatePicker, Space, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface Filters {
  name: string;
  createdAtOrder: 'asc' | 'desc' | null;
  finishedAtOrder: 'asc' | 'desc' | null;
  createdAtRange: [Dayjs | null, Dayjs | null];
  finishedAtRange: [Dayjs | null, Dayjs | null];
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const LogTypeFilterDropdown: React.FC<Props> = ({ filters, setFilters }) => {
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((f) => ({ ...f, name: e.target.value }));
  };

  const setCreatedAtOrder = (order: 'asc' | 'desc' | null) => {
    setFilters((f) => ({ ...f, createdAtOrder: order, finishedAtOrder: null }));
  };

  const setFinishedAtOrder = (order: 'asc' | 'desc' | null) => {
    setFilters((f) => ({ ...f, finishedAtOrder: order, createdAtOrder: null }));
  };

  const onCreatedAtRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    setFilters((f) => ({
      ...f,
      createdAtRange: dates ?? [null, null],
    }));
  };

  const onFinishedAtRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    setFilters((f) => ({
      ...f,
      finishedAtRange: dates ?? [null, null],
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      createdAtOrder: null,
      finishedAtOrder: null,
      createdAtRange: [null, null],
      finishedAtRange: [null, null],
    });
  };

  // When passing value to RangePicker,
  // must pass null if either date is null, else full tuple
  const safeRange = (range: [Dayjs | null, Dayjs | null]) =>
    range[0] && range[1] ? ([range[0], range[1]] as [Dayjs, Dayjs]) : null;

  const menu = (
    <Card
      bordered={false}
      style={{ maxWidth: 300 }}
      className="background-1 shadow"
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Filter by name"
          value={filters.name}
          onChange={onNameChange}
          allowClear
        />

        <div>
          <label>Created At Sort:</label>
          <Space>
            <Button
              type={filters.createdAtOrder === 'asc' ? 'primary' : 'default'}
              size="small"
              onClick={() => setCreatedAtOrder('asc')}
            >
              Asc
            </Button>
            <Button
              type={filters.createdAtOrder === 'desc' ? 'primary' : 'default'}
              size="small"
              onClick={() => setCreatedAtOrder('desc')}
            >
              Desc
            </Button>
            <Button
              type={!filters.createdAtOrder ? 'primary' : 'default'}
              size="small"
              onClick={() => setCreatedAtOrder(null)}
            >
              Clear
            </Button>
          </Space>
        </div>

        <div>
          <label>Finished At Sort:</label>
          <Space>
            <Button
              type={filters.finishedAtOrder === 'asc' ? 'primary' : 'default'}
              size="small"
              onClick={() => setFinishedAtOrder('asc')}
            >
              Asc
            </Button>
            <Button
              type={filters.finishedAtOrder === 'desc' ? 'primary' : 'default'}
              size="small"
              onClick={() => setFinishedAtOrder('desc')}
            >
              Desc
            </Button>
            <Button
              type={!filters.finishedAtOrder ? 'primary' : 'default'}
              size="small"
              onClick={() => setFinishedAtOrder(null)}
            >
              Clear
            </Button>
          </Space>
        </div>

        <div>
          <label>Created At Range:</label>
          <RangePicker
            value={safeRange(filters.createdAtRange)}
            onChange={onCreatedAtRangeChange}
            allowClear
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Finished At Range:</label>
          <RangePicker
            value={safeRange(filters.finishedAtRange)}
            onChange={onFinishedAtRangeChange}
            allowClear
            style={{ width: '100%' }}
          />
        </div>

        <Button type="link" onClick={clearFilters} style={{ paddingLeft: 0 }}>
          Clear All Filters
        </Button>
      </Space>
    </Card>
  );

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      dropdownRender={() => menu}
    >
      <Button>
        Filters <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LogTypeFilterDropdown;
