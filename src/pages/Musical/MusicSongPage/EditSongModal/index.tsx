import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { MusicSong } from '../../../../api/models';
import FileUploader from '../../../../components/FileUploader';
import FileLoader from '../../../../components/FileLoader';

interface EditSongModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<MusicSong>) => void;
  initialData: MusicSong | null;
}

const EditSongModal: React.FC<EditSongModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData]);

  const handleUploadThumbnail = (fileName: string) => {
    console.log(fileName);
    form.setFieldsValue({ thumbnail: fileName });
  };

  const handleUploadAudio = (fileName: string) => {
    form.setFieldsValue({ audio: fileName });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal title="Edit Song" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Song Name"
          rules={[{ required: true, message: 'Please enter a song name' }]}
        >
          <Input />
        </Form.Item>

        <h4>Ảnh nền</h4>
        {initialData?.thumbnail && (
          <FileLoader fileName={initialData?.thumbnail ?? ''} />
        )}

        <Form.Item name="thumbnail" label="Cập nhật ảnh nền mới">
          <FileUploader
            allowedTypes={['image']}
            onFileUploaded={handleUploadThumbnail}
          />
        </Form.Item>

        {initialData?.audio && (
          <FileLoader fileName={initialData?.audio ?? ''} />
        )}

        <Form.Item name="audio" label="Audio File">
          <FileUploader
            allowedTypes={['audio']}
            onFileUploaded={handleUploadAudio}
          />
        </Form.Item>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSongModal;
