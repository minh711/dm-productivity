import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, ColorPicker, Row, Col } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { LogType } from '../../../../../api/models';
import { LogTypeRepository } from '../../../../../api/repositories/logTypeRepository';
import DmColorPicker from '../../../../../components/general/DmColorPicker';

interface AddLogTypeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (logType: LogType) => void;
}

const formRules = {
  name: [{ required: true, message: 'Name is required' }],
  description: [{ required: true, message: 'Description is required' }],
  totalDuration: [{ required: true, message: 'Total duration is required' }],
  createdAt: [{ required: true, message: 'Creation date is required' }],
};

const AddLogTypeModal: React.FC<AddLogTypeModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        createdAt: dayjs(),
        finishedAt: null,
        totalDuration: 0,
      });
    }
  }, [open, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newLogType: LogType = {
        id: uuidv4(),
        name: values.name,
        description: values.description,
        totalDuration: Number(values.totalDuration),
        createdAt: values.createdAt.toDate(),
        finishedAt: values.finishedAt ? values.finishedAt.toDate() : undefined,
        color: values.color || '#b6b6b6',
      };

      LogTypeRepository.add(newLogType);
      onAdd(newLogType);
      onClose();
      form.resetFields();
    });
  };

  return (
    <Modal
      title={t('daily-log.log-type-category.log-type.add-new-modal-title')}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Form.Item name="name" label="Name" rules={formRules.name}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="color" label="Color">
              <DmColorPicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={formRules.description}
        >
          <Input />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="totalDuration"
              label="Total Duration"
              rules={formRules.totalDuration}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="createdAt"
              label="Created At"
              rules={formRules.createdAt}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="finishedAt" label="Finished At">
              <DatePicker allowClear style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddLogTypeModal;
