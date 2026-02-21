'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CarouselAlbum {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  /** Full-size image URL from backend — used for higher quality display */
  fullImage?: string;
  imageCount: number;
}

interface AlbumCarouselProps {
  albums: CarouselAlbum[];
}

function useSlideWidth() {
  const [slideWidth, setSlideWidth] = useState(100);

  useEffect(() => {
    function update() {
      if (window.innerWidth >= 1024) setSlideWidth(45);
      else if (window.innerWidth >= 768) setSlideWidth(60);
      else setSlideWidth(100);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return slideWidth;
}

export function AlbumCarousel({ albums }: AlbumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = albums.length;
  const slideWidth = useSlideWidth();

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused || isDragging) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext, isPaused, isDragging]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev]
  );

  // Touch / mouse drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    dragCurrentX.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Track transform to center the active slide
  const offset = -currentIndex * slideWidth + (100 - slideWidth) / 2;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured albums"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Track container */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: `translateX(${offset}%)` }}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e.clientX);
          }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => {
            if (isDragging) handleDragEnd();
          }}
        >
          {albums.map((album, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={album.slug}
                className={cn(
                  'carousel-slide px-2 md:px-4',
                  isActive ? 'carousel-slide-active' : 'carousel-slide-inactive'
                )}
                style={{ width: `${slideWidth}%` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${totalSlides}: ${album.title}`}
              >
                <Link
                  href={`/portfolio/${album.slug}`}
                  className="group block overflow-hidden rounded-lg"
                  tabIndex={isActive ? 0 : -1}
                  draggable={false}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={album.fullImage || album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 45vw"
                      priority={index === 0}
                      draggable={false}
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute left-4 top-4">
                      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-md">
                        {album.category}
                      </span>
                    </div>

                    {/* Album info */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
                        <span className="relative">
                          {album.title}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
                        </span>
                      </h3>
                      <p className="mt-2 text-sm text-white/60">
                        {album.imageCount} photos
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrow buttons — desktop only */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:flex"
        aria-label="Previous album"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:flex"
        aria-label="Next album"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot navigation */}
      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel navigation">
        {albums.map((album, index) => (
          <button
            key={album.slug}
            onClick={() => goTo(index)}
            className={cn(
              'rounded-full transition-all duration-300',
              index === currentIndex
                ? 'h-2.5 w-8 bg-white'
                : 'h-2.5 w-2.5 bg-white/30 hover:bg-white/50'
            )}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to ${album.title}`}
          />
        ))}
      </div>
    </div>
  );
}
