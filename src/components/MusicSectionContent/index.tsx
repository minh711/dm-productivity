import React, { useEffect, useState } from 'react';
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
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { pitchOrder, validPitches } from '../../constants';
import { AnimatePresence, motion } from 'framer-motion';
import Piano from '../Piano';
import RichTextEditor from '../RichTextEditor';
import { MusicSectionContent as MusicSectionContentModel } from '../../api/models';
import classNames from 'classnames';
import styles from './style.module.css';
import { MusicSectionContentRepository } from '../../api/repositories/musicSectionContentRepository';
import FileUploader from '../FileUploader';
import FileLoader from '../FileLoader';

const { TextArea } = Input;

interface MusicSectionContentProps {
  id: string;
}

const MusicSectionContent: React.FC<MusicSectionContentProps> = ({ id }) => {
  const [pressedPitches, setPressedPitches] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState(pressedPitches.join(' '));
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPitch, setIsShowPitch] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [musicSection, setMusicSection] = useState<MusicSectionContentModel>();

  useEffect(() => {
    const fetchMusicSection = async () => {
      const data = await MusicSectionContentRepository.getById(id);
      if (data) {
        setMusicSection(data);
        setDescription(data.description || '');
        setNotes(data.notes || '');
        setPressedPitches(data.notes?.split(' ') || []);
      }
    };

    fetchMusicSection();
  }, [id]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setIsEditingText(true);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleUpdateNotesClick = () => {
    const newPitches = notes
      .split(/\s+/)
      .map((p) => p.trim())
      .filter((p) => p !== '');

    const invalidPitches = newPitches.filter((pitch) => {
      const note = pitch.slice(0, -1);
      const octave = pitch.slice(-1);
      return !validPitches.includes(note) || isNaN(parseInt(octave));
    });

    if (invalidPitches.length > 0) {
      message.warning(`Invalid pitches: ${invalidPitches.join(', ')}`);
      return;
    }

    newPitches.sort((a, b) => {
      const [noteA, octaveA] = [a.slice(0, -1), parseInt(a.slice(-1))];
      const [noteB, octaveB] = [b.slice(0, -1), parseInt(b.slice(-1))];

      if (octaveA !== octaveB) return octaveA - octaveB;
      return pitchOrder.indexOf(noteA) - pitchOrder.indexOf(noteB);
    });

    setPressedPitches(newPitches);
    setNotes(newPitches.join(' '));
    setMusicSection((prev: any) => ({
      ...prev,
      notes: newPitches.join(' '),
    }));

    setIsEditingText(false);
  };

  const handleOk = async () => {
    if (!musicSection) return;

    const updatedContent: MusicSectionContentModel = {
      ...musicSection,
      description,
      notes,
    };

    const success = await MusicSectionContentRepository.update(updatedContent);

    if (success) {
      setMusicSection(updatedContent);
      setIsExpanded(false);
      setIsEdit(false);
    } else {
      message.error('Failed to update content');
    }
  };

  const handleUploadImage = async (fileName: string) => {
    if (!musicSection) {
      return;
    }

    setMusicSection((prev: any) => ({
      ...prev,
      image: fileName,
    }));

    await MusicSectionContentRepository.update(musicSection);
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: {
      opacity: 0,
      height: 0,
      overflow: 'hidden',
      transition: { duration: 0.2 },
    },
  };

  return (
    <div>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.editButton)}>
          {!isExpanded ? (
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              onClick={() => setIsExpanded(true)}
              style={{ borderRadius: '50%' }}
            />
          ) : (
            <Button
              className="ms-sm"
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={handleOk}
              style={{ borderRadius: '50%' }}
            />
          )}
        </div>

        <AnimatePresence mode="sync">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={expandVariants}
              className={classNames('mb-m', styles.description)}
            >
              {description !== '' ? (
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              ) : (
                <div>No description</div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={expandVariants}
            >
              <div>
                <div>
                  <h3>Description</h3>

                  <div className="mt-sm mb-m">
                    <RichTextEditor
                      value={description}
                      onChange={handleDescriptionChange}
                      isSerif={true}
                    />
                  </div>
                </div>

                <Divider />

                <div>
                  <h3>Image</h3>
                  <FileUploader
                    allowedTypes={['image']}
                    onFileUploaded={handleUploadImage}
                  />
                </div>

                <Divider />

                <div>
                  <h3>Notes</h3>

                  <TextArea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Enter pitches separated by space or enter"
                    autoSize={{ minRows: 1, maxRows: 6 }}
                  />

                  <Row
                    className="mt-m mb-m"
                    justify={'space-between'}
                    align={'middle'}
                  >
                    <Row>
                      <span className="me-sm">Edit Mode</span>
                      <Switch checked={isEdit} onChange={setIsEdit} />
                      <span className="ms-m me-sm">Show Pitch Notation</span>
                      <Switch checked={isShowPitch} onChange={setIsShowPitch} />
                    </Row>

                    <Button onClick={handleUpdateNotesClick}>
                      Update notes
                    </Button>
                  </Row>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {musicSection?.image && !isExpanded && (
          <FileLoader
            className="d-flex justify-content-center"
            fileName={musicSection?.image ?? ''}
          />
        )}

        {((pressedPitches.length > 0 &&
          !pressedPitches.every((pitch) => pitch === '')) ||
          isExpanded) && (
          <Piano
            isShowPitch={isShowPitch}
            pressedPitches={pressedPitches}
            isEdit={isEdit}
            onChangePressedPitches={(newPitches) => {
              setPressedPitches(newPitches);
              if (!isEditingText) {
                setNotes(newPitches.join(' '));
              }
            }}
          />
        )}

        {isExpanded && (
          <Button className="mt-m" type="primary" onClick={handleOk}>
            Save all
          </Button>
        )}
      </div>
    </div>
  );
};

export default MusicSectionContent;
