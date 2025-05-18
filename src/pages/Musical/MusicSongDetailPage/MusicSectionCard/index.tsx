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
import MusicSectionContent from '../../../../components/Musical/MusicSectionContent';

interface MusicSectionCardProps {
  section: any;
  updateSectionContentOrder: (
    sectionId: string,
    updatedContentIds: any[]
  ) => void;
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
  updateSectionContentOrder,
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
  const moveContent = (contentId: string, direction: number) => {
    if (!section || !section.contentIds) return;

    const contentIndex = section.contentIds.findIndex(
      (c: any) => c.id === contentId
    );
    if (contentIndex === -1) return;

    const targetIndex = contentIndex + direction;
    if (targetIndex < 0 || targetIndex >= section.contentIds.length) return;

    // Swap orders
    const updatedContentIds = [...section.contentIds];
    [
      updatedContentIds[contentIndex].order,
      updatedContentIds[targetIndex].order,
    ] = [
      updatedContentIds[targetIndex].order,
      updatedContentIds[contentIndex].order,
    ];

    // Recalculate order to ensure it starts from 1
    updatedContentIds
      .sort((a, b) => a.order - b.order)
      .forEach((c, i) => {
        c.order = i + 1;
      });

    updateSectionContentOrder(section.id, updatedContentIds);
  };

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
            initial={{ opacity: 0, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {section
              .contentIds!.slice()
              .sort((a: any, b: any) => a.order - b.order)
              .map((item: any) => (
                <Card className="mb-m" key={item.id}>
                  <MusicSectionContent id={item.id} />
                  <Row justify="space-between" align={'bottom'}>
                    <Row align={'bottom'}>
                      <Button
                        disabled={item.order === 1}
                        onClick={() => moveContent(item.id, -1)}
                        type="text"
                        icon={<CaretUpOutlined />}
                      />
                      <Button
                        disabled={item.order === section.contentIds.length}
                        onClick={() => moveContent(item.id, 1)}
                        type="text"
                        icon={<CaretDownOutlined />}
                      />
                    </Row>

                    <Button
                      className="mt-m"
                      danger
                      onClick={() => handleDeleteContent(section.id, item.id)}
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
