import React, { useState, useEffect } from 'react';

const FileUploader: React.FC = () => {
  const [fileBase64, setFileBase64] = useState<string | null>(null); // To store Base64 data

  const handleFileSelect = async () => {
    const selectedFilePath = await window.electron.selectFile();
    if (selectedFilePath) {
      // You could potentially call another function here to process the file
      alert(`File selected: ${selectedFilePath}`);
    } else {
      alert('No file selected.');
    }
  };

  const fetchFileBase64 = async (fileName: string) => {
    const base64Data = await window.electron.getFilePath(fileName); // Get the Base64 data
    if (base64Data) {
      setFileBase64(base64Data); // Store Base64 data
      
    } else {
      alert('File not found');
    }
  };

  useEffect(() => {
    // Example usage of fetchFileBase64 with a specific file name
    fetchFileBase64('512x512.png'); // Example file name, change as needed
  }, []);

  return (
    <div>
      {fileBase64 ? (
        <img
          src={`data:image/png;base64,${fileBase64}`} // Display Base64 image
          alt="Selected File"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : (
        <p>No file loaded yet.</p>
      )}
      <button onClick={handleFileSelect}>Select File</button>
      {fileBase64 && <p>File loaded as Base64.</p>}
    </div>
  );
};

export default FileUploader;
