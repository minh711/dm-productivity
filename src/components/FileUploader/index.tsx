import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

interface FileUploaderProps {
  allowedTypes?: ('image' | 'audio' | 'video' | 'pdf' | 'any')[];
  onFileUploaded?: (fileName: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  allowedTypes = ['image'],
  onFileUploaded,
}) => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  const handleFileSelect = async () => {
    const fileName = await window.electron.uploadFile();
    if (fileName) {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (!ext) {
        alert('Invalid file type.');
        return;
      }

      // Determine the file category
      const isImage = [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp',
        'bmp',
        'svg',
      ].includes(ext);
      const isAudio = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext);
      const isVideo = [
        'mp4',
        'avi',
        'mov',
        'mkv',
        'webm',
        'flv',
        'wmv',
      ].includes(ext);
      const isPdf = ext === 'pdf';

      let typeCategory: string = 'any';
      if (isImage) typeCategory = 'image';
      else if (isAudio) typeCategory = 'audio';
      else if (isVideo) typeCategory = 'video';
      else if (isPdf) typeCategory = 'pdf';

      if (
        !allowedTypes.includes(typeCategory as any) &&
        !allowedTypes.includes('any')
      ) {
        alert(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
        return;
      }

      setFileName(fileName);
      setFileType(typeCategory);
      fetchFileBase64(fileName, typeCategory);
      onFileUploaded?.(fileName);
    }
  };

  const fetchFileBase64 = async (fileName: string, typeCategory: string) => {
    console.log(fileName);
    const base64Data = await window.electron.getFile(fileName);
    if (base64Data) {
      setFileBase64(base64Data);
      setMimeType(typeCategory);
    } else {
      alert('File not found');
    }
  };

  useEffect(() => {
    if (fileName && fileType) {
      fetchFileBase64(fileName, fileType);
    }
  }, [fileName, fileType]);

  const getAudioMimeType = (ext: string) => {
    switch (ext) {
      case 'mp3':
        return 'audio/mpeg';
      case 'wav':
        return 'audio/wav';
      case 'ogg':
        return 'audio/ogg';
      case 'flac':
        return 'audio/flac';
      case 'aac':
        return 'audio/aac';
      case 'm4a':
        return 'audio/mp4';
      default:
        return 'audio/mpeg';
    }
  };

  return (
    <div>
      {fileBase64 && mimeType === 'image' && (
        <img
          src={`data:image/*;base64,${fileBase64}`}
          alt="Selected File"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      {fileBase64 && mimeType === 'audio' && (
        <audio controls>
          <source
            src={`data:${getAudioMimeType(
              fileName?.split('.').pop()?.toLowerCase() || 'mp3'
            )};base64,${fileBase64}`}
          />
          Your browser does not support the audio element.
        </audio>
      )}
      {fileBase64 && mimeType === 'video' && (
        <video controls style={{ width: '100%', height: 'auto' }}>
          <source src={`data:video/*;base64,${fileBase64}`} />
          Your browser does not support the video element.
        </video>
      )}
      {fileBase64 && mimeType === 'pdf' && (
        <iframe
          src={`data:application/pdf;base64,${fileBase64}`}
          style={{ width: '100%', height: '500px' }}
        />
      )}
      {fileBase64 && mimeType === 'any' && (
        <p>
          Uploaded File: <strong>{fileName}</strong>
        </p>
      )}
      {!fileBase64 && <p>No file loaded yet.</p>}

      <Button onClick={handleFileSelect}>Select File</Button>
    </div>
  );
};

export default FileUploader;
