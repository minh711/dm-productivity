import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Input, Layout, Menu, Modal, Row } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
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
  const [collapsed, setCollapsed] = useState(false);
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

      if (foundSong?.musicSections!.length) {
        const sectionPromises = foundSong.musicSections.map((musicSectionId) =>
          MusicSectionRepository.getById(musicSectionId)
        );
        const resolvedSections = await Promise.all(sectionPromises);
        const validSections = resolvedSections.filter(
          (s) => s !== null
        ) as MusicSection[];

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
      musicSections: [...(song.musicSections || []), newSectionId],
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
        ? { ...section, contentIds: [...section.contentIds!, newContentId] }
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
          (id) => id !== deleteTarget.sectionId
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
              contentIds: section.contentIds!.filter((id) => id !== contentId),
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
            right: 0,
            height: 'calc(100vh - 160px)',
            borderRadius: '24px 0 0 24px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
          className="ms-m shadow"
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
          <Content style={{ paddingRight: 80 }}>
            <h1>{song.name}</h1>
            {sections.map((section) => (
              <Card
                className="mb-m"
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
              >
                <Row
                  className="mb-m"
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

                {section.contentIds!.map((contentId) => (
                  <Card className="mb-m" key={contentId}>
                    <MusicSectionContent id={contentId} />
                    <Row justify={'end'}>
                      <Button
                        className="mt-m"
                        danger
                        onClick={() =>
                          handleDeleteContent(section.id, contentId)
                        }
                        icon={<DeleteOutlined />}
                      />
                    </Row>
                  </Card>
                ))}

                <Row justify={'space-between'} align={'middle'}>
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
              </Card>
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
