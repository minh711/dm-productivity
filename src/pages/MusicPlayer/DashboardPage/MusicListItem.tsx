import React from 'react';
import FileLoader from '../../../components/General/FileLoader';

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
    <div>
      {metadata.thumbnail && (
        <FileLoader fileName={metadata.thumbnail} height={100} width={100} />
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

export default MusicListItem;
