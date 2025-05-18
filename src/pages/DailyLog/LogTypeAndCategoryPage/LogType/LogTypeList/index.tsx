import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { LogTypeRepository } from '../../../../../api/repositories/logTypeRepository';
import { LogType } from '../../../../../api/models';

import AddLogTypeModal from '../AddLogTypeModal';
import EditLogTypeModal from '../EditLogTypeModal';
import LogTypeFilterDropdown from './LogTypeFilterDropdown';
import LogTypeTable from './LogTypeTable';
import LogTypeChart from './LogTypeChart';

const { Title } = Typography;

interface Filters {
  name: string;
  createdAtOrder: 'asc' | 'desc' | null;
  finishedAtOrder: 'asc' | 'desc' | null;
  createdAtRange: [Dayjs | null, Dayjs | null];
  finishedAtRange: [Dayjs | null, Dayjs | null];
}

const LogTypeList = () => {
  const { t } = useTranslation();

  const [logTypes, setLogTypes] = useState<LogType[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    createdAtOrder: null,
    finishedAtOrder: null,
    createdAtRange: [null, null],
    finishedAtRange: [null, null],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogType, setEditingLogType] = useState<LogType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await LogTypeRepository.getAll();
      setLogTypes(data);
      setSelectedIds(data.map((lt) => lt.id));
    })();
  }, []);

  // Filtering and sorting logic with Dayjs
  const filteredLogTypes = useMemo(() => {
    let filtered = [...logTypes];

    // Filter by name
    if (filters.name.trim()) {
      filtered = filtered.filter((lt) =>
        lt.name.toLowerCase().includes(filters.name.trim().toLowerCase())
      );
    }

    // Filter by createdAtRange using Dayjs
    if (filters.createdAtRange[0] && filters.createdAtRange[1]) {
      filtered = filtered.filter((lt) => {
        const created = dayjs(lt.createdAt);
        return (
          created.isSameOrAfter(filters.createdAtRange[0]!) &&
          created.isSameOrBefore(filters.createdAtRange[1]!)
        );
      });
    }

    // Filter by finishedAtRange using Dayjs
    if (filters.finishedAtRange[0] && filters.finishedAtRange[1]) {
      filtered = filtered.filter((lt) => {
        if (!lt.finishedAt) return false;
        const finished = dayjs(lt.finishedAt);
        return (
          finished.isSameOrAfter(filters.finishedAtRange[0]!) &&
          finished.isSameOrBefore(filters.finishedAtRange[1]!)
        );
      });
    }

    // Sort by createdAt or finishedAt using Dayjs
    if (filters.createdAtOrder) {
      filtered.sort((a, b) =>
        filters.createdAtOrder === 'asc'
          ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
          : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    } else if (filters.finishedAtOrder) {
      filtered.sort((a, b) => {
        const aTime = a.finishedAt ? dayjs(a.finishedAt).valueOf() : 0;
        const bTime = b.finishedAt ? dayjs(b.finishedAt).valueOf() : 0;
        return filters.finishedAtOrder === 'asc'
          ? aTime - bTime
          : bTime - aTime;
      });
    }

    return filtered;
  }, [logTypes, filters]);

  // Keep selectedIds synced with filtered data
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => filteredLogTypes.some((lt) => lt.id === id))
    );
  }, [filteredLogTypes]);

  // Handlers
  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddLogType = (newLogType: LogType) => {
    setLogTypes((prev) => [...prev, newLogType]);
    setSelectedIds((ids) => [...ids, newLogType.id]);
  };

  const handleEdit = (logType: LogType) => setEditingLogType(logType);

  const handleUpdate = async (updated: LogType) => {
    const success = await LogTypeRepository.update(updated);
    if (success) {
      const updatedLogTypes = await LogTypeRepository.getAll();
      setLogTypes(updatedLogTypes);
      setSelectedIds(updatedLogTypes.map((lt) => lt.id));
    }
    setEditingLogType(null);
  };

  const handleDelete = async (id: string) => {
    await LogTypeRepository.delete(id);
    const updatedLogTypes = await LogTypeRepository.getAll();
    setLogTypes(updatedLogTypes);
    setSelectedIds(updatedLogTypes.map((lt) => lt.id));
    setEditingLogType(null);
  };

  return (
    <div>
      <Card bordered={false}>
        <Title level={4}>
          {t('daily-log.log-type-category.log-type.total-duration-chart')}
        </Title>
        <LogTypeChart
          logTypes={filteredLogTypes.filter((lt) =>
            selectedIds.includes(lt.id)
          )}
        />
      </Card>

      <Card bordered={false} className="mt-m">
        <Row justify="space-between" className="mb-sm">
          <Button type="primary" onClick={handleAddNew}>
            {t('daily-log.log-type-category.log-type.add-new')}
          </Button>

          <LogTypeFilterDropdown filters={filters} setFilters={setFilters} />
        </Row>

        <LogTypeTable
          data={filteredLogTypes}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onEdit={handleEdit}
        />

        <AddLogTypeModal
          open={isModalOpen}
          onClose={handleModalClose}
          onAdd={handleAddLogType}
        />

        {editingLogType && (
          <EditLogTypeModal
            logType={editingLogType}
            open={!!editingLogType}
            onClose={() => setEditingLogType(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </Card>
    </div>
  );
};

export default LogTypeList;
