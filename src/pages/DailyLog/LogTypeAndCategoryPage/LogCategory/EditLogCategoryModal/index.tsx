import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Popconfirm,
} from 'antd';
import dayjs from 'dayjs';
import { LogCategory } from '../../../../../api/models';
import { LogCategoryRepository } from '../../../../../api/repositories/logCategoryRepository';
import DmColorPicker from '../../../../../components/general/DmColorPicker';

interface EditLogCategoryModalProps {
  open: boolean;
  logCategory: LogCategory;
  onClose: () => void;
  onUpdate: (logCategory: LogCategory) => void;
  onDelete: (logCategoryId: string) => void;
}

const EditLogCategoryModal: React.FC<EditLogCategoryModalProps> = ({
  open,
  logCategory,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...logCategory,
        createdAt: dayjs(logCategory.createdAt),
        finishedAt: logCategory.finishedAt
          ? dayjs(logCategory.finishedAt)
          : null,
      });
    }
  }, [open, logCategory, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onUpdate({
        ...logCategory,
        ...values,
        createdAt: values.createdAt.toDate(),
        finishedAt: values.finishedAt ? values.finishedAt.toDate() : undefined,
      });
    });
  };

  const handleDelete = () => {
    LogCategoryRepository.delete(logCategory.id);
    onDelete(logCategory.id);
    onClose();
  };

  return (
    <Modal
      title="Edit Log Category"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete this log type?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="color" label="Color">
              <DmColorPicker
                style={{ width: '100%' }}
                value={form.getFieldValue('color')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item name="totalDuration" label="Total Duration">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="createdAt" label="Created At">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="finishedAt" label="Finished At">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditLogCategoryModal;
