import React, { useState } from 'react';

type MusicFile = {
  path: string;
  metadata: {
    artist: string | null;
    album: string | null;
    title: string;
    picture: string | null;
  };
};

const MusicPlayerDashboardPage = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // Fix broken picture string ONCE before setting state
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

  const handleSelectFolder = async () => {
    try {
      const files = await window.electron.selectMusicFolder();
      if (Array.isArray(files)) {
        // Fix pictures once here before setting state
        const fixedFiles = files.map((file) => ({
          ...file,
          metadata: {
            ...file.metadata,
            picture: fixPictureString(file.metadata.picture),
          },
        }));

        setMusicFiles(fixedFiles);
      } else {
        setMusicFiles([]);
      }
    } catch (error) {
      console.error('Error selecting music folder:', error);
    }
  };

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
                  <img src={metadata.picture} alt="artwork" />
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
