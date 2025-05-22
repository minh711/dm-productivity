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
  scrollRootRef?: React.RefObject<Element>;
};

const LazyMusicListItem: React.FC<Props> = ({
  path,
  metadata,
  onPlay,
  scrollRootRef,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRootRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Intersection:', entry.isIntersecting, entry);
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        root: scrollRootRef.current || null,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [scrollRootRef]);

  return (
    <div ref={ref} style={{ width: '200px' }}>
      {visible && (
        <Suspense fallback={<div>Loading...</div>}>
          <MusicListItem path={path} metadata={metadata} onPlay={onPlay} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyMusicListItem;
