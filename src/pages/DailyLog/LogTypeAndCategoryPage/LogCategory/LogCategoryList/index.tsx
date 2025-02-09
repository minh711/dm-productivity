import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'antd';
import { logCategoryColumns } from './columns';
import AddLogCategoryModal from '../AddLogCategoryModal';
import { useTranslation } from 'react-i18next';
import { LogCategory } from '../../../../../api/models';
import { LogCategoryRepository } from '../../../../../api/repositories/logCategoryRepository';
import EditLogCategoryModal from '../EditLogCategoryModal';

const LogCategoryList = () => {
  const { t } = useTranslation();

  const [logCategories, setLogCategories] = useState<LogCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLogCategories(LogCategoryRepository.getAll());
  }, []);

  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddLogCategory = (newLogCategory: LogCategory) =>
    setLogCategories([...logCategories, newLogCategory]);

  const [editingLogCategory, setEditingLogCategory] =
    useState<LogCategory | null>(null);

  const handleEdit = (logCategory: LogCategory) => {
    setEditingLogCategory(logCategory);
  };

  const handleUpdate = (updatedLogCategory: LogCategory) => {
    if (LogCategoryRepository.update(updatedLogCategory)) {
      setLogCategories(LogCategoryRepository.getAll());
    }
    setEditingLogCategory(null);
  };

  const handleDelete = (logCategoryId: string) => {
    LogCategoryRepository.delete(logCategoryId);
    setLogCategories(LogCategoryRepository.getAll());
    setEditingLogCategory(null);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-sm">
        <Button type="primary" onClick={handleAddNew}>
          {t('daily-log.log-type-category.log-category.add-new')}
        </Button>
        <Button type="primary">
          {t('daily-log.log-type-category.log-category.filter')}
        </Button>
      </Row>

      <Table
        columns={logCategoryColumns(handleEdit)}
        dataSource={logCategories}
        rowKey="id"
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
    </div>
  );
};

export default LogCategoryList;
