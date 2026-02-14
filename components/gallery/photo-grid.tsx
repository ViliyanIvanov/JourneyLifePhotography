'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/content/mock-data';
import type { MediaAssetDto } from '@/lib/api';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('./lightbox-wrapper'), {
  ssr: false,
});

// Skeleton loader component for images
function PhotoSkeleton() {
  return (
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-black to-brand-black/50 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-white/5 to-transparent" />
    </div>
  );
}

type PhotoData = Photo | MediaAssetDto;

interface PhotoGridProps {
  photos: PhotoData[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  initialLoadCount?: number;
  loadMoreCount?: number;
}

export function PhotoGrid({
  photos,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  initialLoadCount = 8,
  loadMoreCount = 8,
}: PhotoGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(initialLoadCount);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const handlePhotoClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleImageLoad = useCallback((photoId: string) => {
    setLoadedImages(prev => new Set([...prev, photoId]));
  }, []);

  // Infinite loading: load more when scrolling to bottom
  useEffect(() => {
    if (inView && displayedCount < photos.length && !isLoading) {
      setDisplayedCount(prev => Math.min(prev + loadMoreCount, photos.length));
    }
  }, [inView, displayedCount, photos.length, isLoading, loadMoreCount]);

  // External load more (if provided)
  useEffect(() => {
    if (inView && hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  // Get only the photos to display
  const displayedPhotos = photos.slice(0, displayedCount);
  const hasMoreToShow = displayedCount < photos.length;

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
        {displayedPhotos.map((photo, index) => {
          // Handle both Photo and MediaAssetDto formats
          const thumbnailUrl = 'thumbnailUrl' in photo ? photo.thumbnailUrl : photo.thumbUrl;
          const alt = 'alt' in photo ? photo.alt : (photo.altText || 'Photo');
          const isImageLoaded = loadedImages.has(photo.id);

          return (
            <button
              key={photo.id}
              onClick={() => handlePhotoClick(index)}
              className="relative aspect-square overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-white/40 focus:ring-offset-2 focus:ring-offset-brand-black"
            >
              {/* Skeleton loader shown until image loads */}
              {!isImageLoaded && <PhotoSkeleton />}

              <Image
                src={thumbnailUrl}
                alt={alt}
                fill
                className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < initialLoadCount ? 'eager' : 'lazy'}
                onLoad={() => handleImageLoad(photo.id)}
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500" />
            </button>
          );
        })}
      </div>

      {/* Show loading indicator when there are more photos to display */}
      {(hasMoreToShow || hasMore) && (
        <div ref={ref} className="mt-8 text-center">
          <p className="text-brand-white/70">
            {isLoading ? 'Loading more photos...' : `Showing ${displayedCount} of ${photos.length} photos`}
          </p>
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

