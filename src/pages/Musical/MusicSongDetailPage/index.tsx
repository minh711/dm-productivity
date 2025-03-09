import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Input, Layout, Menu, Modal, Row } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
  UpOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { MusicSongRepository } from '../../../api/repositories/musicSongRepository';
import { MusicSectionRepository } from '../../../api/repositories/musicSectionRepository';
import { MusicSectionContentRepository } from '../../../api/repositories/musicSectionContentRepository';
import {
  MusicSong,
  MusicSection,
  MusicSectionContent as MusicSectionContentModel,
} from '../../../api/models';
import MusicSectionContent from '../../../components/MusicSectionContent';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from './style.module.css';
import MusicSectionCard from './MusicSectionCard';

const MusicSongDetailPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState<MusicSong | null>(null);
  const [sections, setSections] = useState<MusicSection[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'section' | 'content';
    sectionId: string;
    contentId?: string;
  } | null>(null);
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<MusicSection | null>(
    null
  );
  const [editedSectionName, setEditedSectionName] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [collapsedSections, setCollapsedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const scrollToSection = (sectionId: string) => {
    const sectionElement = sectionRefs.current[sectionId];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleCollapse = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const foundSong = await MusicSongRepository.getById(id);
      setSong(foundSong);

      if (foundSong?.musicSections?.length) {
        const sectionPromises = foundSong.musicSections.map(({ id }) =>
          MusicSectionRepository.getById(id)
        );
        const resolvedSections = await Promise.all(sectionPromises);
        const validSections = resolvedSections
          .filter((s) => s !== null)
          .map((section, index) => ({
            ...section!,
            order: foundSong.musicSections!.find((s) => s.id === section!.id)!
              .order,
          }))
          .sort((a, b) => a.order - b.order); // Ensure correct order

        setSections(validSections);
      }
    };

    fetchData();
  }, [id]);

  const handleAddSection = async () => {
    if (!song) return;

    const newSectionId = uuidv4();
    const newSection: MusicSection = {
      id: newSectionId,
      name: '',
      tagIds: [],
      contentIds: [],
    };

    await MusicSectionRepository.add(newSection);

    const updatedSong: MusicSong = {
      ...song,
      musicSections: [
        ...(song.musicSections || []),
        { id: newSectionId, order: (song.musicSections?.length ?? 0) + 1 },
      ],
    };

    await MusicSongRepository.update(updatedSong);

    setSections((prev) => [...prev, newSection]);
    setSong(updatedSong);
  };

  const handleAddContent = async (sectionId: string) => {
    const newContentId = uuidv4();
    const newContent: MusicSectionContentModel = {
      id: newContentId,
      description: '',
      notes: '',
      pdf: '',
      audio: '',
      tagIds: [],
      tags: [],
    };

    await MusicSectionContentRepository.add(newContent);

    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            contentIds: [
              ...section.contentIds!,
              {
                id: newContentId,
                order: (section.contentIds?.length ?? 0) + 1,
              },
            ],
          }
        : section
    );

    await MusicSectionRepository.update(
      updatedSections.find((s) => s.id === sectionId)!
    );

    setSections(updatedSections);
  };

  const handleDeleteSection = async (sectionId: string) => {
    setDeleteTarget({ type: 'section', sectionId });
  };

  const handleDeleteContent = async (sectionId: string, contentId: string) => {
    setDeleteTarget({ type: 'content', sectionId, contentId });
  };

  const confirmDelete = async (permanent: boolean) => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'section') {
      if (!song) return;

      // Remove section from song
      const updatedSong = {
        ...song,
        musicSections: song.musicSections!.filter(
          (item) => item.id !== deleteTarget.sectionId
        ),
      };
      await MusicSongRepository.update(updatedSong);
      setSong(updatedSong);

      if (permanent) {
        // Delete section permanently
        await MusicSectionRepository.delete(deleteTarget.sectionId);
      }

      // Remove section from UI
      setSections((prev) =>
        prev.filter((section) => section.id !== deleteTarget.sectionId)
      );
    } else if (deleteTarget.type === 'content') {
      const { sectionId, contentId } = deleteTarget;

      // Remove content ID from section
      const updatedSections = sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              contentIds: section.contentIds!.filter(
                (item) => item.id !== contentId
              ),
            }
          : section
      );

      await MusicSectionRepository.update(
        updatedSections.find((s) => s.id === sectionId)!
      );

      if (permanent) {
        await MusicSectionContentRepository.delete(contentId!);
      }

      setSections(updatedSections);
    }

    setDeleteTarget(null);
  };

  const handleEditSection = (section: MusicSection) => {
    setEditingSection(section);
    setEditedSectionName(section.name);
    setIsEditSectionModalOpen(true);
  };

  const handleConfirmEditSection = async () => {
    if (!editingSection || !editedSectionName.trim()) return;

    const updatedSection: MusicSection = {
      ...editingSection,
      name: editedSectionName.trim(),
    };

    await MusicSectionRepository.update(updatedSection);

    setSections((prev) =>
      prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
    );

    setIsEditSectionModalOpen(false);
    setEditingSection(null);
    setEditedSectionName('');
  };

  const moveSection = async (sectionId: string, direction: number) => {
    if (!song) return;

    const sectionIndex = song.musicSections.findIndex(
      (s) => s.id === sectionId
    );
    if (sectionIndex === -1) return;

    const targetIndex = sectionIndex + direction;
    if (targetIndex < 0 || targetIndex >= song.musicSections.length) return;

    // Swap orders in song.musicSections
    const updatedMusicSections = [...song.musicSections];
    [
      updatedMusicSections[sectionIndex].order,
      updatedMusicSections[targetIndex].order,
    ] = [
      updatedMusicSections[targetIndex].order,
      updatedMusicSections[sectionIndex].order,
    ];

    // Recalculate order to ensure it starts from 1
    updatedMusicSections
      .sort((a, b) => a.order - b.order)
      .forEach((s, i) => {
        s.order = i + 1;
      });

    // Sort sections based on updated song.musicSections order
    const updatedSections = updatedMusicSections.map(
      (s) => sections.find((section) => section.id === s.id)!
    );

    // Update state
    setSections(updatedSections);
    setSong({ ...song, musicSections: updatedMusicSections });

    // Update backend
    await Promise.all([
      MusicSongRepository.update({
        ...song,
        musicSections: updatedMusicSections,
      }),
    ]);
  };

  const updateSectionContentOrder = async (
    sectionId: string,
    updatedContentIds: any[]
  ) => {
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId ? { ...s, contentIds: updatedContentIds } : s
      )
    );

    const section = await MusicSectionRepository.getById(sectionId);
    if (!section) return;

    const updatedSection = { ...section, contentIds: updatedContentIds };
    await MusicSectionRepository.update(updatedSection);
  };

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div>
      <Layout>
        <Sider
          collapsed={collapsed}
          onCollapse={setCollapsed}
          theme="light"
          style={{
            position: 'fixed',
            top: 80,
            height: 'calc(100vh - 160px)',
            overflowY: 'auto',
            zIndex: 1000,
          }}
          className={classNames('ms-m shadow', styles.sider)}
        >
          <div style={{ padding: 16, textAlign: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <Menu mode="inline" theme="light">
            {sections.map((section) => (
              <Menu.Item
                key={section.id}
                onClick={() => scrollToSection(section.id)}
              >
                {section.name || 'Untitled Section'}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout>
          <Content
            style={{ paddingRight: 80, minHeight: 'calc(100vh - 160px)' }}
          >
            <h1>{song.name}</h1>
            {sections.map((section) => (
              <MusicSectionCard
                key={section.id}
                section={section}
                updateSectionContentOrder={updateSectionContentOrder}
                song={song}
                collapsedSections={collapsedSections}
                handleToggleCollapse={handleToggleCollapse}
                moveSection={moveSection}
                handleEditSection={handleEditSection}
                handleDeleteSection={handleDeleteSection}
                handleAddContent={handleAddContent}
                handleDeleteContent={handleDeleteContent}
                sectionRefs={sectionRefs}
              />
            ))}

            <Button type="primary" onClick={handleAddSection}>
              Add Section
            </Button>

            <Modal
              title="Confirm Deletion"
              open={!!deleteTarget}
              onCancel={() => setDeleteTarget(null)}
              footer={[
                <Button key="cancel" onClick={() => setDeleteTarget(null)}>
                  Cancel
                </Button>,
                <Button key="soft-delete" onClick={() => confirmDelete(false)}>
                  Remove from Song/Section
                </Button>,
                <Button
                  key="hard-delete"
                  danger
                  onClick={() => confirmDelete(true)}
                >
                  Delete Completely
                </Button>,
              ]}
            >
              <p>
                {deleteTarget?.type === 'section'
                  ? 'Are you sure you want to delete this section?'
                  : 'Are you sure you want to delete this content?'}
              </p>
              <p>This action cannot be undone if deleted permanently.</p>
            </Modal>

            <Modal
              title="Edit Section"
              open={isEditSectionModalOpen}
              onCancel={() => setIsEditSectionModalOpen(false)}
              onOk={handleConfirmEditSection}
            >
              <Input
                placeholder="Enter section name"
                value={editedSectionName}
                onChange={(e) => setEditedSectionName(e.target.value)}
              />
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MusicSongDetailPage;
