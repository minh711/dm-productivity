import React, { useState } from 'react';
import { Card, Col, Button } from 'antd';
import classNames from 'classnames';
import { EditOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import FileLoader from '../../../../components/General/FileLoader';
import { useNavigate } from 'react-router-dom';
import { MUSIC_SONG_PATH } from '../../../../constants';

interface SongItemProps {
  song: {
    id: string;
    name: string;
    thumbnail?: string;
  };
  onEdit: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onEdit }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleSongClick = () => {
    navigate(`${MUSIC_SONG_PATH}/${song.id}`);
  };

  return (
    <div
      className={styles.songItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      {hovered && (
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => onEdit(song.id)}
          className={styles.editButton}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
          }}
        />
      )}
      <Card
        onClick={handleSongClick}
        style={{ cursor: 'pointer' }}
        cover={
          song.thumbnail ? (
            <FileLoader
              fileName={song.thumbnail}
              className={classNames(styles.songCover)}
              innerStyle={{ width: '100% !important' }}
              height={240}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '240px',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              No Thumbnail
            </div>
          )
        }
      >
        <Card.Meta title={song.name} />
      </Card>
    </div>
  );
};

export default SongItem;
