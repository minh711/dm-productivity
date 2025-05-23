import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { LogCategoryRepository } from '../../../../../api/repositories/logCategoryRepository';
import { LogCategory } from '../../../../../api/models';

import AddLogCategoryModal from '../AddLogCategoryModal';
import EditLogCategoryModal from '../EditLogCategoryModal';
import LogCategoryFilterDropdown from './LogCategoryFilterDropdown';
import LogCategoryTable from './LogCategoryTable';
import LogCategoryChart from './LogCategoryChart';

const { Title } = Typography;

interface Filters {
  name: string;
  createdAtOrder: 'asc' | 'desc' | null;
  finishedAtOrder: 'asc' | 'desc' | null;
  createdAtRange: [Dayjs | null, Dayjs | null];
  finishedAtRange: [Dayjs | null, Dayjs | null];
  finishedStatus: 'finished' | 'not_finished' | null;
}

const LogCategoryList = () => {
  const { t } = useTranslation();

  const [logCategories, setLogCategories] = useState<LogCategory[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    createdAtOrder: null,
    finishedAtOrder: null,
    createdAtRange: [null, null],
    finishedAtRange: [null, null],
    finishedStatus: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogCategory, setEditingLogCategory] =
    useState<LogCategory | null>(null);

  useEffect(() => {
    (async () => {
      const data = await LogCategoryRepository.getAll();
      setLogCategories(data);
      setSelectedIds(data.map((lc) => lc.id));
    })();
  }, []);

  // Filtering and sorting logic with Dayjs
  const filteredLogCategories = useMemo(() => {
    let filtered = [...logCategories];

    // Filter by name
    if (filters.name.trim()) {
      filtered = filtered.filter((lc) =>
        lc.name.toLowerCase().includes(filters.name.trim().toLowerCase())
      );
    }

    // Filter by createdAtRange using Dayjs
    if (filters.createdAtRange[0] && filters.createdAtRange[1]) {
      filtered = filtered.filter((lc) => {
        const created = dayjs(lc.createdAt);
        return (
          created.isSameOrAfter(filters.createdAtRange[0]!) &&
          created.isSameOrBefore(filters.createdAtRange[1]!)
        );
      });
    }

    // Filter by finishedAtRange using Dayjs
    if (filters.finishedAtRange[0] && filters.finishedAtRange[1]) {
      filtered = filtered.filter((lc) => {
        if (!lc.finishedAt) return false;
        const finished = dayjs(lc.finishedAt);
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

    // Filter by finishedStatus
    if (filters.finishedStatus === 'finished') {
      filtered = filtered.filter((lc) => !!lc.finishedAt);
    } else if (filters.finishedStatus === 'not_finished') {
      filtered = filtered.filter((lc) => !lc.finishedAt);
    }

    return filtered;
  }, [logCategories, filters]);

  // Keep selectedIds synced with filtered data
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => filteredLogCategories.some((lc) => lc.id === id))
    );
  }, [filteredLogCategories]);

  // Handlers
  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddLogCategory = (newLogCategory: LogCategory) => {
    setLogCategories((prev) => [...prev, newLogCategory]);
    setSelectedIds((ids) => [...ids, newLogCategory.id]);
  };

  const handleEdit = (logCategory: LogCategory) =>
    setEditingLogCategory(logCategory);

  const handleUpdate = async (updated: LogCategory) => {
    const success = await LogCategoryRepository.update(updated);
    if (success) {
      const updatedLogCategories = await LogCategoryRepository.getAll();
      setLogCategories(updatedLogCategories);
      setSelectedIds(updatedLogCategories.map((lc) => lc.id));
    }
    setEditingLogCategory(null);
  };

  const handleDelete = async (id: string) => {
    await LogCategoryRepository.delete(id);
    const updatedLogCategories = await LogCategoryRepository.getAll();
    setLogCategories(updatedLogCategories);
    setSelectedIds(updatedLogCategories.map((lc) => lc.id));
    setEditingLogCategory(null);
  };

  return (
    <div>
      <Card bordered={false}>
        <Title level={4}>Total</Title>
        <LogCategoryChart
          logCategories={filteredLogCategories.filter((lc) =>
            selectedIds.includes(lc.id)
          )}
        />
      </Card>

      <Card bordered={false} className="mt-m">
        <Row justify="space-between" className="mb-sm">
          <Button type="primary" onClick={handleAddNew}>
            {t('daily-log.log-type-category.log-category.add-new')}
          </Button>

          <LogCategoryFilterDropdown
            filters={filters}
            setFilters={setFilters}
          />
        </Row>

        <LogCategoryTable
          data={filteredLogCategories}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onEdit={handleEdit}
        />

        <AddLogCategoryModal
          open={isModalOpen}
          onClose={handleModalClose}
          onAdd={handleAddLogCategory}
        />

        {editingLogCategory && (
          <EditLogCategoryModal
            logCategory={editingLogCategory}
            open={!!editingLogCategory}
            onClose={() => setEditingLogCategory(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </Card>
    </div>
  );
};

export default LogCategoryList;
