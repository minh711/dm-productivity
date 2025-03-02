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
import { pitchOrder, validPitches } from '../../constants';
import { AnimatePresence, motion } from 'framer-motion';
import Piano from '../Piano';
import RichTextEditor from '../RichTextEditor';

const { TextArea } = Input;
const { Title } = Typography;

const MusicSectionContent = () => {
  const [pressedPitches, setPressedPitches] = useState<string[]>([
    'C3',
    'C4',
    'Db4', // TODO: Test
  ]);
  const [textValue, setTextValue] = useState(pressedPitches.join(' '));
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPitch, setIsShowPitch] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    setIsEditingText(true);
  };

  const handleUpdateClick = () => {
    const newPitches = textValue
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
    setTextValue(newPitches.join(' '));
    setIsEditingText(false);
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
      <Title level={2}>Musical Dashboard</Title>

      <Card>
        <Row justify={'space-between'} align={'top'}>
          <Title level={4}>Pitches</Title>
          {!isExpanded ? (
            <Button type="primary" onClick={() => setIsExpanded(true)}>
              Edit
            </Button>
          ) : (
            <Button
              className="ms-sm"
              type="primary"
              onClick={() => {
                setIsExpanded(false);
                setIsEdit(false);
              }}
            >
              OK
            </Button>
          )}
        </Row>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={expandVariants}
              className="mb-m"
            >
              Description
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
                <div className="mt-sm mb-m">
                  <RichTextEditor value="" onChange={() => {}} />
                </div>

                <Divider />

                <TextArea
                  value={textValue}
                  onChange={handleTextChange}
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

                  <Button type="primary" onClick={handleUpdateClick}>
                    Update
                  </Button>
                </Row>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Piano
          isShowPitch={isShowPitch}
          pressedPitches={pressedPitches}
          isEdit={isEdit}
          onChangePressedPitches={(newPitches) => {
            setPressedPitches(newPitches);
            if (!isEditingText) {
              setTextValue(newPitches.join(' '));
            }
          }}
        />
      </Card>
    </div>
  );
};

export default MusicSectionContent;
