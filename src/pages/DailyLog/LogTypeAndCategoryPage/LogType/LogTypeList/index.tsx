import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'antd';
import { logTypeColumns } from './columns';
import AddLogTypeModal from '../AddLogTypeModal';
import { useTranslation } from 'react-i18next';
import { LogTypeRepository } from '../../../../../api/repositories/logTypeRepository';
import { LogType } from '../../../../../api/models';
import EditLogTypeModal from '../EditLogTypeModal';

const LogTypeList = () => {
  const { t } = useTranslation();

  const [logTypes, setLogTypes] = useState<LogType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogTypes = async () => {
      const logTypes = await LogTypeRepository.getAll();
      setLogTypes(logTypes);
    };

    fetchLogTypes();
  }, []);

  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddLogType = (newLogType: LogType) =>
    setLogTypes([...logTypes, newLogType]);

  const [editingLogType, setEditingLogType] = useState<LogType | null>(null);

  const handleEdit = (logType: LogType) => {
    setEditingLogType(logType);
  };

  const handleUpdate = async (updatedLogType: LogType) => {
    const success = await LogTypeRepository.update(updatedLogType);
    if (success) {
      const updatedLogType = await LogTypeRepository.getAll();
      setLogTypes(updatedLogType);
    }
    setEditingLogType(null);
  };

  const handleDelete = async (logTypeId: string) => {
    await LogTypeRepository.delete(logTypeId);
    const updatedLogType = await LogTypeRepository.getAll();
    setLogTypes(updatedLogType);
    setEditingLogType(null);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-sm">
        <Button type="primary" onClick={handleAddNew}>
          {t('daily-log.log-type-category.log-type.add-new')}
        </Button>
        <Button type="primary">
          {t('daily-log.log-type-category.log-type.filter')}
        </Button>
      </Row>

      <Table
        columns={logTypeColumns(handleEdit)}
        dataSource={logTypes}
        rowKey="id"
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
    </div>
  );
};

export default LogTypeList;
