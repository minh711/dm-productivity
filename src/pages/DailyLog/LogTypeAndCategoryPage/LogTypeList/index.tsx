import React, { useEffect, useState } from 'react';
import { LogType } from '../../../../api/models';
import { Button, Row, Table } from 'antd';
import { logTypeColumns } from './columns';
import { LogTypeRepository } from '../../../../api/repositories/logTypeRepository';
import AddLogTypeModal from '../AddLogTypeModal';
import { useTranslation } from 'react-i18next';

const LogTypeList = () => {
  const { t } = useTranslation();

  const [logTypes, setLogTypes] = useState<LogType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLogTypes(LogTypeRepository.getAll());
  }, []);

  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddLogType = (newLogType: LogType) =>
    setLogTypes([...logTypes, newLogType]);

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

      <Table columns={logTypeColumns} dataSource={logTypes} rowKey="id" />

      <AddLogTypeModal
        open={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleAddLogType}
      />
    </div>
  );
};

export default LogTypeList;
