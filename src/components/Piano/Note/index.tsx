import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type NoteProps = {
  isBlack?: boolean;
  pitch?: string;
  isShowPitch?: boolean;
  pressedPitches?: string[];
  setPressedPitches?: (newPressed: string[]) => void;
  isEdit?: boolean;
};

const Note: React.FC<NoteProps> = ({
  isBlack = false,
  pitch,
  isShowPitch = true,
  pressedPitches = [],
  setPressedPitches,
  isEdit = false,
}) => {
  const isPressed = (): boolean => {
    if (!pitch) return false;

    const sharpToFlatMap: Record<string, string> = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
    };

    // Normalize pressedPitches
    const normalizedPressed = pressedPitches.map((p) => {
      const note = p.slice(0, -1); // Extract note (e.g., "C#" from "C#1")
      const octave = p.slice(-1); // Extract octave (e.g., "1" from "C#1")
      return (sharpToFlatMap[note] || note) + octave;
    });

    return normalizedPressed.includes(pitch);
  };

  useEffect(() => {
    isPressed();
  }, [pressedPitches, pitch]);

  const handleClick = () => {
    if (!isEdit || !pitch || !setPressedPitches) return;

    if (isPressed()) {
      setPressedPitches(pressedPitches.filter((p) => p !== pitch));
    } else {
      setPressedPitches([...pressedPitches, pitch]);
    }
  };

  return (
    <div
      className={classNames(
        isBlack ? styles.noteBlack : styles.noteWhite,
        styles.note,
        isEdit && styles.isEdit,
        isPressed() && styles.pressed
      )}
      onClick={handleClick}
    >
      {isShowPitch && <div className={classNames(styles.pitch)}>{pitch}</div>}
    </div>
  );
};

export default Note;
