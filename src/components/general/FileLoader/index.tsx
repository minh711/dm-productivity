import { Image, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

interface FileLoaderProps {
  fileName: string;
  style?: React.CSSProperties;
  className?: string;
  innerClassName?: string;
  height?: number;
  width?: number;
}

const FileLoader: React.FC<FileLoaderProps> = ({
  fileName,
  style,
  className,
  innerClassName,
  height,
  width,
}) => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (fileName) {
      fetchFileBase64(fileName);
    }
  }, [fileName]);

  const fetchFileBase64 = async (fileName: string) => {
    const base64Data = await window.electron.getFile(fileName);
    if (base64Data) {
      setFileBase64(base64Data);
      setFileType(getFileType(fileName));
    } else {
      console.error('File not found');
    }
  };

  const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return 'any';

    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext))
      return 'image';
    if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext))
      return 'audio';
    if (['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv'].includes(ext))
      return 'video';
    if (ext === 'pdf') return 'pdf';

    return 'any';
  };

  if (!fileBase64)
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          width: '100%',
        }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <div className={className} style={style}>
      {fileType === 'image' && (
        <Image
          src={`data:image/*;base64,${fileBase64}`}
          alt="File"
          height={height}
          width={width ?? '100%'}
          style={{ objectFit: 'cover' }}
          className={innerClassName}
        />
      )}
      {fileType === 'audio' && (
        <audio controls>
          <source src={`data:audio/*;base64,${fileBase64}`} />
        </audio>
      )}
      {fileType === 'video' && (
        <video controls style={{ width: '100%' }}>
          <source src={`data:video/*;base64,${fileBase64}`} />
        </video>
      )}
      {fileType === 'pdf' && (
        <iframe
          src={`data:application/pdf;base64,${fileBase64}`}
          style={{ width: '100%', height: '500px' }}
        />
      )}
      {fileType === 'any' && (
        <div>
          <p>
            File: <strong>{fileName}</strong>
          </p>
          <a
            href={`data:application/octet-stream;base64,${fileBase64}`}
            download={fileName}
            style={{
              display: 'inline-block',
              padding: '8px 12px',
              background: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default FileLoader;
