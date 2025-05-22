import React, { useState, useEffect } from 'react';
import FileLoader from '../../../components/General/FileLoader';
import { Button } from 'antd';
import LazyMusicListItem from './LazyMusicListItem';
import style from './style.module.css';
import classNames from 'classnames';

type MusicFile = {
  path: string;
  metadata: {
    artist: string | null;
    album: string | null;
    title: string;
    picture: string | null;
    thumbnail: string | null;
  };
};

const MusicPlayerDashboardPage = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchStoredMusic = async () => {
      try {
        const stored = await window.electron.get('music', []);
        if (Array.isArray(stored)) {
          setMusicFiles(stored);
        }
      } catch (err) {
        console.error('Failed to load stored music:', err);
        setMusicFiles([]);
      }
    };

    fetchStoredMusic();
  }, []);

  const handleSelectFolder = async () => {
    try {
      const files = await window.electron.selectMusicFolder();
      if (Array.isArray(files)) {
        const processedFiles: MusicFile[] = files.map((file) => ({
          path: file.path,
          metadata: {
            artist: file.metadata.artist,
            album: file.metadata.album,
            title: file.metadata.title,
            picture: file.metadata.picture,
            thumbnail: file.metadata.thumbnail,
          },
        }));
        setMusicFiles(processedFiles);
        console.log(processedFiles);
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
    <div className={style.container}>
      {loading && <div className={style.loading}></div>}

      <Button
        className={classNames('mb-m', style.selectBtn)}
        onClick={handleSelectFolder}
      >
        Select Music Folder
      </Button>

      <div className={style.content}>
        {musicFiles.length > 0 ? (
          <ul className={style.list}>
            {musicFiles.map(({ path, metadata }, index) => (
              <li key={index} className={style.listItem}>
                <LazyMusicListItem
                  path={path}
                  metadata={metadata}
                  onPlay={handlePlay}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={style.emptyMessage}>No music files loaded.</p>
        )}

        {currentTrack && (
          <div className={style.player}>
            <p>Now Playing:</p>
            <audio
              ref={(el) => {
                if (el) el.volume = 0.05;
              }}
              controls
              autoPlay
              src={currentTrack}
              className={style.audioPlayer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayerDashboardPage;
