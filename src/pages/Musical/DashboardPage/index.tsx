import React, { useState } from 'react';
import {
  Input,
  Typography,
  Button,
  message,
  Switch,
  Card,
  Row,
  Divider,
} from 'antd';
import Piano from '../../../components/Piano';
import { pitchOrder, validPitches } from '../../../constants';
import MusicSectionContent from '../../../components/MusicSectionContent';
import MusicSongPage from '../MusicSongPage';

const { TextArea } = Input;
const { Title } = Typography;

const MusicalDashboardPage = () => {
  return (
    <div>
      <MusicSongPage />

      <MusicSectionContent />
    </div>
  );
};

export default MusicalDashboardPage;
