import React, { useState } from 'react';
import { Card, Col, Button } from 'antd';
import classNames from 'classnames';
import { EditOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import FileLoader from '../../../../components/FileLoader';

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
        cover={
          song.thumbnail ? (
            <FileLoader
              fileName={song.thumbnail}
              className={classNames(styles.songCover)}
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
