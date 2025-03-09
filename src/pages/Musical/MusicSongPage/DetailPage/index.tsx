import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicSongRepository } from '../../../../api/repositories/musicSongRepository';
import { MusicSong } from '../../../../api/models';

const MusicSongDetailPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState<MusicSong | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      const foundSong = await MusicSongRepository.getById(id!);
      setSong(foundSong);
    };

    fetchSong();
  }, [id]);

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div>
      <h1>{song.name}</h1>
    </div>
  );
};

export default MusicSongDetailPage;
