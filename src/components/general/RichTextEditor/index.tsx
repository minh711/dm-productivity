import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isSerif?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  isSerif = false,
}) => {
  const handlePaste = (event: React.ClipboardEvent) => {
    const clipboardData = event.clipboardData || (window as any).clipboardData;

    if (!clipboardData) return;

    for (const item of clipboardData.items) {
      if (item.kind === 'file') {
        event.preventDefault(); // Block pasting files (images, videos, etc.)
        return;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        editor.setAttribute('spellcheck', 'false'); // ✅ Disable spellcheck
        clearInterval(interval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    const styleId = 'quill-editor-font-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.innerHTML = `
      .ql-editor {
        font-family: ${isSerif ? 'Georgia, Times, serif' : 'Arial, sans-serif'};
      }
    `;
  }, [isSerif]);

  return (
    <div onPaste={handlePaste}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
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
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'script',
  'indent',
  'direction',
  'color',
  'background',
  'align',
];

export default RichTextEditor;
