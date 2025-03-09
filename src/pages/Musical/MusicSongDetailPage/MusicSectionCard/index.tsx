import React from 'react';
import { Button, Card, Row } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from './style.module.css';
import MusicSectionContent from '../../../../components/MusicSectionContent';

interface MusicSectionCardProps {
  section: any;
  song: any;
  collapsedSections: { [key: string]: boolean };
  handleToggleCollapse: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: number) => void;
  handleEditSection: (section: any) => void;
  handleDeleteSection: (sectionId: string) => void;
  handleAddContent: (sectionId: string) => void;
  handleDeleteContent: (sectionId: string, contentId: string) => void;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

const MusicSectionCard: React.FC<MusicSectionCardProps> = ({
  section,
  song,
  collapsedSections,
  handleToggleCollapse,
  moveSection,
  handleEditSection,
  handleDeleteSection,
  handleAddContent,
  handleDeleteContent,
  sectionRefs,
}) => {
  return (
    <Card
      className={classNames(styles.sectionContainer, 'mb-m')}
      key={section.id}
      ref={(el) => (sectionRefs.current[section.id] = el)}
    >
      <Row className={classNames(styles.sectionOptions, 'shadow')}>
        <Button
          type="text"
          onClick={() => handleToggleCollapse(section.id)}
          icon={
            collapsedSections[section.id] ? <DownOutlined /> : <UpOutlined />
          }
        />
        <Button
          disabled={
            song.musicSections.find((s: any) => s.order === 1)?.id ===
            section.id
          }
          onClick={() => moveSection(section.id, -1)}
          type="text"
          icon={<CaretUpOutlined />}
        />
        <Button
          disabled={
            song.musicSections.find(
              (s: any) => s.order === song.musicSections.length
            )?.id === section.id
          }
          onClick={() => moveSection(section.id, 1)}
          type="text"
          icon={<CaretDownOutlined />}
        />
      </Row>

      <Row
        style={{ width: '100% !important' }}
        justify={'space-between'}
        align={'middle'}
      >
        <h2>{section.name || 'Untitled Section'}</h2>
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: '50%' }}
          icon={<EditOutlined />}
          onClick={() => handleEditSection(section)}
        />
      </Row>

      <AnimatePresence>
        {!collapsedSections[section.id] && (
          <motion.div
            className="mt-m"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {section.contentIds!.map((contentId: any) => (
              <Card className="mb-m" key={contentId}>
                <MusicSectionContent id={contentId} />
                <Row justify="end">
                  <Button
                    className="mt-m"
                    danger
                    onClick={() => handleDeleteContent(section.id, contentId)}
                    icon={<DeleteOutlined />}
                  />
                </Row>
              </Card>
            ))}

            <Row justify="space-between" align="middle">
              <Button
                type="primary"
                onClick={() => handleAddContent(section.id)}
              >
                Add Content
              </Button>
              <Button
                danger
                onClick={() => handleDeleteSection(section.id)}
                icon={<DeleteOutlined />}
              />
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default MusicSectionCard;
