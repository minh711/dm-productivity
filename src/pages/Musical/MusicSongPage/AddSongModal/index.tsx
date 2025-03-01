import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { MusicSong } from '../../../../api/models';

interface AddSongModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (song: Omit<MusicSong, 'id' | 'thumbnail' | 'audio'>) => void;
  initialData?: Omit<MusicSong, 'id' | 'thumbnail' | 'audio'> | null;
}

const AddSongModal: React.FC<AddSongModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, visible]);

  const handleFinish = async (
    values: Omit<MusicSong, 'id' | 'thumbnail' | 'audio'>
  ) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Modal
      title="Add Song"
      className="modal-m"
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Song Name"
          rules={[{ required: true, message: 'Please enter song name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSongModal;
