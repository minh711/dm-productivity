import React, { useState, useEffect } from 'react';

type MusicFile = {
  path: string;
  metadata: {
    artist: string | null;
    album: string | null;
    title: string;
    pictureBlob: Blob | null;
  };
};

const MusicPlayerDashboardPage = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const fixPictureString = (picture: string | null): string | null => {
    if (!picture) return null;
    const base64PrefixMatch = picture.match(/^(data:[^;]+;base64,)(.*)$/);
    if (!base64PrefixMatch) return picture;

    const prefix = base64PrefixMatch[1];
    const data = base64PrefixMatch[2];

    if (!data.includes(',')) return picture;

    const byteStrings = data.split(',');
    const bytes = new Uint8Array(byteStrings.map((b) => parseInt(b, 10)));

    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);
    return prefix + base64String;
  };

  const base64ToBlob = (base64String: string): Blob => {
    const [prefix, base64Data] = base64String.split(',');
    const mimeMatch = prefix.match(/data:(.*);base64/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters, (c) => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleSelectFolder = async () => {
    try {
      const files = await window.electron.selectMusicFolder();
      if (Array.isArray(files)) {
        const processedFiles: MusicFile[] = files.map((file) => {
          const fixedBase64 = fixPictureString(file.metadata.picture);
          const blob = fixedBase64 ? base64ToBlob(fixedBase64) : null;
          return {
            path: file.path,
            metadata: {
              artist: file.metadata.artist,
              album: file.metadata.album,
              title: file.metadata.title,
              pictureBlob: blob,
            },
          };
        });

        setMusicFiles(processedFiles);
      } else {
        setMusicFiles([]);
      }
    } catch (error) {
      console.error('Error selecting music folder:', error);
    }
  };

  const handlePlay = (filePath: string) => {
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
              <MusicListItem
                path={path}
                metadata={metadata}
                onPlay={handlePlay}
              />
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

// ⬇️ Extracted list item with its own image URL lifecycle
const MusicListItem = ({
  path,
  metadata,
  onPlay,
}: {
  path: string;
  metadata: MusicFile['metadata'];
  onPlay: (path: string) => void;
}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!metadata.pictureBlob) return;

    const url = URL.createObjectURL(metadata.pictureBlob);
    setImgUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [metadata.pictureBlob]);

  return (
    <div>
      {imgUrl && (
        <img
          src={imgUrl}
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
      <button onClick={() => onPlay(path)}>Play</button>
    </div>
  );
};
