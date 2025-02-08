import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './draggableScroll.module.css';

interface DraggableScrollProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const DraggableScroll = ({ children, maxWidth }: DraggableScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 2; // Adjust speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.draggableScroll, {
        [styles.dragging]: isDragging,
      })}
      style={{ maxWidth }}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
      onTouchEnd={stopDrag}
    >
      {children}
    </div>
  );
};

export default DraggableScroll;
