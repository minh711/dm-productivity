import React, { useState, useEffect } from 'react';

type MusicFile = {
  path: string;
  metadata: {
    artist: string | null;
    album: string | null;
    title: string;
    picture: string | null; // this will be a Blob URL after processing
  };
};

const MusicPlayerDashboardPage = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // Convert broken picture base64 string to proper base64 string
  const fixPictureString = (picture: string | null): string | null => {
    if (!picture) return null;

    const base64PrefixMatch = picture.match(/^(data:[^;]+;base64,)(.*)$/);
    if (!base64PrefixMatch) {
      // No base64 prefix, just return as is
      return picture;
    }

    const prefix = base64PrefixMatch[1]; // e.g. "data:image/png;base64,"
    const data = base64PrefixMatch[2]; // e.g. "137,80,78,71,..."

    if (!data.includes(',')) {
      // Already proper base64 string
      return picture;
    }

    // Convert comma-separated decimal bytes to base64 string
    const byteStrings = data.split(',');
    const bytes = new Uint8Array(byteStrings.map((b) => parseInt(b, 10)));

    // Convert bytes to binary string then base64 encode
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);

    return prefix + base64String;
  };

  // Convert base64 string to Blob URL
  const base64ToBlobUrl = (base64String: string): string => {
    const [prefix, base64Data] = base64String.split(',');
    const mimeMatch = prefix.match(/data:(.*);base64/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  // When selecting folder, fix picture strings and convert to blob URLs
  const handleSelectFolder = async () => {
    try {
      const files = await window.electron.selectMusicFolder();
      if (Array.isArray(files)) {
        // Revoke previous Blob URLs to avoid memory leaks
        musicFiles.forEach((file) => {
          if (file.metadata.picture) {
            URL.revokeObjectURL(file.metadata.picture);
          }
        });

        const fixedFiles = files.map((file) => {
          const fixedBase64 = fixPictureString(file.metadata.picture);
          return {
            ...file,
            metadata: {
              ...file.metadata,
              picture: fixedBase64 ? base64ToBlobUrl(fixedBase64) : null,
            },
          };
        });

        setMusicFiles(fixedFiles);
      } else {
        setMusicFiles([]);
      }
    } catch (error) {
      console.error('Error selecting music folder:', error);
    }
  };

  // Cleanup blob URLs on unmount or when musicFiles change
  useEffect(() => {
    return () => {
      musicFiles.forEach((file) => {
        if (file.metadata.picture) {
          URL.revokeObjectURL(file.metadata.picture);
        }
      });
    };
  }, [musicFiles]);

  const handlePlay = (filePath: string) => {
    const file = musicFiles.find((f) => f.path === filePath);
    if (file) {
      console.log(file.metadata);
    }

    const safePath = `file://${filePath.replace(/\\/g, '/')}`;
    setCurrentTrack(safePath);
  };

  return (
    <div>
      <button onClick={handleSelectFolder}>Select Music Folder</button>

      {musicFiles.length > 0 ? (
        <ul>
          {musicFiles.map(({ path, metadata }, index) => (
            <li key={index}>
              <div>
                {metadata.picture && (
                  <img
                    src={metadata.picture}
                    alt="artwork"
                    style={{ maxWidth: 100, maxHeight: 100 }}
                  />
                )}
                <div>
                  <p>{metadata.title}</p>
                  <p>
                    {metadata.artist} — {metadata.album}
                  </p>
                </div>
              </div>
              <button onClick={() => handlePlay(path)}>Play</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No music files loaded.</p>
      )}

      {currentTrack && (
        <div>
          <p>Now Playing:</p>
          <audio
            ref={(el) => {
              if (el) el.volume = 0.05;
            }}
            controls
            autoPlay
            src={currentTrack}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayerDashboardPage;
