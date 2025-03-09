import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import Note from './Note';
import html2canvas from 'html2canvas';
import { Button, Card, Row, Space } from 'antd';
import {
  CopyOutlined,
  DotNetOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

type PianoProps = {
  isShowPitch?: boolean;
  isEdit?: boolean;
  pressedPitches?: string[];
  onChangePressedPitches?: (newPressed: string[]) => void;
};

const Piano: React.FC<PianoProps> = ({
  isShowPitch = false,
  isEdit = false,
  pressedPitches = [],
  onChangePressedPitches,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [localPressedPitches, setLocalPressedPitches] =
    useState<string[]>(pressedPitches);

  useEffect(() => {
    setLocalPressedPitches(pressedPitches);
  }, [pressedPitches]);

  useEffect(() => {
    onChangePressedPitches?.(localPressedPitches);
  }, [localPressedPitches]);

  const handleUpdatePressedPitches = (newPressed: string[]) => {
    setLocalPressedPitches(newPressed);
  };

  const handleDownload = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current);
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'component.png';
    link.click();
  };

  const handleCopyToClipboard = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current);
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        alert('Image copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy image: ', err);
      }
    }, 'image/png');
  };

  return (
    <Card>
      <div className={classNames(styles.parentContainer)}>
        <div className={classNames(styles.buttons)}>
          <Space direction="vertical">
            <Button
              onClick={handleCopyToClipboard}
              icon={<CopyOutlined />}
              style={{ borderRadius: '50%' }}
            />
            <Button
              onClick={handleDownload}
              icon={<DownloadOutlined />}
              style={{ borderRadius: '50%' }}
            />
          </Space>
        </div>

        <div className={classNames(styles.container)}>
          <div className={classNames(styles.pianoContainer)}>
            <div ref={componentRef} className={classNames(styles.piano, 'p-m')}>
              <div style={{ width: '48px', overflow: 'hidden' }}>
                <div
                  style={{
                    display: 'flex',
                    width: 'fit-content',
                  }}
                >
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A0"
                  ></Note>
                  <div style={{ transform: 'translateX(-7px)', zIndex: 1 }}>
                    <Note
                      isShowPitch={isShowPitch}
                      pressedPitches={localPressedPitches}
                      setPressedPitches={handleUpdatePressedPitches}
                      isEdit={isEdit}
                      isBlack={true}
                      pitch="Bb0"
                    ></Note>
                  </div>
                  <div style={{ transform: 'translateX(-14px)' }}>
                    <Note
                      isShowPitch={isShowPitch}
                      pressedPitches={localPressedPitches}
                      setPressedPitches={handleUpdatePressedPitches}
                      isEdit={isEdit}
                      pitch="B0"
                    ></Note>
                  </div>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb1"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B1"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb2"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B2"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb3"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B3"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb4"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B4"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb5"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B5"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb6"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B6"
                  ></Note>
                </div>
              </div>

              <div className={classNames(styles.registerContainer)}>
                <div className={classNames(styles.register)}>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="C7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Db7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="D7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Eb7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="E7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="F7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Gb7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="G7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Ab7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="A7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    isBlack={true}
                    pitch="Bb7"
                  ></Note>
                  <Note
                    isShowPitch={isShowPitch}
                    pressedPitches={localPressedPitches}
                    setPressedPitches={handleUpdatePressedPitches}
                    isEdit={isEdit}
                    pitch="B7"
                  ></Note>
                </div>
              </div>

              <Note
                isShowPitch={isShowPitch}
                pressedPitches={localPressedPitches}
                setPressedPitches={handleUpdatePressedPitches}
                isEdit={isEdit}
                pitch="A8"
              ></Note>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Piano;
