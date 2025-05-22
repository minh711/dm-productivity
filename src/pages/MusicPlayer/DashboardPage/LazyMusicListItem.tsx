// LazyMusicListItem.tsx
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import style from './style.module.css';

const MusicListItem = lazy(() => import('./MusicListItem'));

type Props = {
  path: string;
  metadata: {
    artist: string | null;
    album: string | null;
    title: string;
    picture: string | null;
    thumbnail: string | null;
  };
  onPlay: (path: string) => void;
};

const LazyMusicListItem: React.FC<Props> = ({ path, metadata, onPlay }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Load only once
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={style.listItem}>
      {visible && (
        <Suspense fallback={<div>Loading...</div>}>
          <MusicListItem path={path} metadata={metadata} onPlay={onPlay} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyMusicListItem;
