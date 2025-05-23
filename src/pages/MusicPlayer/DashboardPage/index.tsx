import React, { useState, useEffect, useRef } from 'react';
import FileLoader from '../../../components/General/FileLoader';
import { Button, Card, Col, Row } from 'antd';
import LazyMusicListItem from './LazyMusicListItem';
import style from './style.module.css';
import classNames from 'classnames';
import FullscreenLoading from '../../../components/General/FullscreenLoading';

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classNames(style.container)}>
      <FullscreenLoading />

      <Button
        className={classNames('mb-m', style.selectBtn)}
        onClick={handleSelectFolder}
      >
        Select Music Folder
      </Button>

      <div
        className={classNames('rounded', style.content)}
        ref={scrollContainerRef}
      >
        {musicFiles.map(({ path, metadata }, index) => (
          <LazyMusicListItem
            key={path}
            path={path}
            metadata={metadata}
            onPlay={handlePlay}
            scrollRootRef={scrollContainerRef}
          />
        ))}
      </div>

      <Card bordered={false} className={classNames(style.player)}>
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
              className={style.audioPlayer}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default MusicPlayerDashboardPage;
