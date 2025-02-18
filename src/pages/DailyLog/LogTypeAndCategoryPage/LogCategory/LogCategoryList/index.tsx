import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'antd';
import { logCategoryColumns } from './columns';
import AddLogCategoryModal from '../AddLogCategoryModal';
import { useTranslation } from 'react-i18next';
import { LogCategoryRepository } from '../../../../../api/repositories/logCategoryRepository';
import { LogCategory } from '../../../../../api/models';
import EditLogCategoryModal from '../EditLogCategoryModal';

const LogCategoryList = () => {
  const { t } = useTranslation();

  const [logCategories, setLogCategories] = useState<LogCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogCategories = async () => {
      const categories = await LogCategoryRepository.getAll();
      setLogCategories(categories);
    };

    fetchLogCategories();
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

  const handleUpdate = async (updatedLogCategory: LogCategory) => {
    const success = await LogCategoryRepository.update(updatedLogCategory);
    if (success) {
      const updatedCategories = await LogCategoryRepository.getAll();
      setLogCategories(updatedCategories);
    }
    setEditingLogCategory(null);
  };

  const handleDelete = async (logCategoryId: string) => {
    await LogCategoryRepository.delete(logCategoryId);
    const updatedCategories = await LogCategoryRepository.getAll();
    setLogCategories(updatedCategories);
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
