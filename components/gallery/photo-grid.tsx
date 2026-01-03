'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Photo } from '@/content/mock-data';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('./lightbox-wrapper'), {
  ssr: false,
});

interface PhotoGridProps {
  photos: Photo[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

const PHOTOS_PER_PAGE = 20;

export function PhotoGrid({
  photos,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: PhotoGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const handlePhotoClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // Load more when intersection observer triggers
  if (inView && hasMore && !isLoading && onLoadMore) {
    onLoadMore();
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-white/70">No photos found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => handlePhotoClick(index)}
            className="relative aspect-square overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-brand-black"
          >
            <Image
              src={photo.thumbnailUrl}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500" />
          </button>
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="mt-8 text-center">
          {isLoading && (
            <p className="text-brand-white/70">Loading more photos...</p>
          )}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}

