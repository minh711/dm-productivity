import React, { useEffect, useState } from 'react';
import { Button, message, Row, Col } from 'antd';
import { MusicSong } from '../../../api/models';
import { MusicSongRepository } from '../../../api/repositories/musicSongRepository';
import AddSongModal from './AddSongModal';
import SongItem from './SongItem';
import EditSongModal from './EditSongModal';

const MusicSongPage = () => {
  const [songs, setSongs] = useState<MusicSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingSong, setEditingSong] = useState<MusicSong | null>(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    const data = await MusicSongRepository.getAll();
    setSongs(data);
    setLoading(false);
  };

  const handleAdd = async (
    values: Omit<MusicSong, 'id' | 'thumbnail' | 'audio'>
  ) => {
    const newSong: MusicSong = {
      id: Date.now().toString(),
      ...values,
      thumbnail: '',
      audio: '',
    };
    await MusicSongRepository.add(newSong);
    message.success('Song added successfully');
    setIsAddModalVisible(false);
    fetchSongs();
  };

  const handleEdit = (song: MusicSong) => {
    setEditingSong(song);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (updatedValues: Partial<MusicSong>) => {
    if (editingSong) {
      const updatedSong = { ...editingSong, ...updatedValues };
      await MusicSongRepository.update(updatedSong);
      message.success('Song updated successfully');
      setIsEditModalVisible(false);
      setEditingSong(null);
      fetchSongs();
    }
  };

  return (
    <div>
      <Button
        className="mb-m"
        type="primary"
        onClick={() => setIsAddModalVisible(true)}
      >
        Add Song
      </Button>

      <Row gutter={[16, 16]}>
        {songs.map((song) => (
          <Col key={song.id} lg={8} md={12} sm={24}>
            <SongItem song={song} onEdit={() => handleEdit(song)} />
          </Col>
        ))}
      </Row>

      <AddSongModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAdd}
      />

      <EditSongModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSubmit={handleUpdate}
        initialData={editingSong}
      />
    </div>
  );
};

export default MusicSongPage;
