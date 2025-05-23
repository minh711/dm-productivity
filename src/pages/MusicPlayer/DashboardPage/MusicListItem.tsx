import React from 'react';
import FileLoader from '../../../components/General/FileLoader';
import { Button, Card, Tooltip } from 'antd';

type MusicFileMetadata = {
  artist: string | null;
  album: string | null;
  title: string;
  thumbnail: string | null;
};

type Props = {
  path: string;
  metadata: MusicFileMetadata;
  onPlay: (path: string) => void;
};

const MusicListItem: React.FC<Props> = ({ path, metadata, onPlay }) => {
  return (
    <Card bordered={false}>
      <div className="d-flex justify-content-center">
        {metadata.thumbnail ? (
          <FileLoader
            fileName={metadata.thumbnail}
            height={128}
            width={128}
            style={{ height: 128, width: 128, backgroundColor: '#000' }}
            className="rounded"
            innerClassName="rounded"
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: 128, height: 128, background: '#ddd' }}
          >
            No data
          </div>
        )}
      </div>

      <Tooltip
        title={`${metadata.title} - ${metadata.artist} — ${metadata.album}`}
      >
        <Button
          className="mt-m"
          style={{ width: '100%' }}
          onClick={() => onPlay(path)}
        >
          Play
        </Button>
      </Tooltip>
    </Card>
  );
};

export default MusicListItem;
