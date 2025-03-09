import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const handlePaste = (event: React.ClipboardEvent) => {
    const clipboardData = event.clipboardData || (window as any).clipboardData;

    if (!clipboardData) return;

    // Get all clipboard items
    for (const item of clipboardData.items) {
      if (item.kind === 'file') {
        event.preventDefault(); // Block pasting files (images, videos, etc.)
        return;
      }
    }
  };

  return (
    <div onPaste={handlePaste}>
      <ReactQuill
        style={{ backgroundColor: '#fff' }}
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

export default RichTextEditor;
