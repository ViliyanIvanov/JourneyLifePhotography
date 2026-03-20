'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CarouselAlbum {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  imageCount: number;
}

const AUTOPLAY_MS = 5500;

interface AlbumCarouselProps {
  albums: CarouselAlbum[];
  onSlideChange?: (index: number) => void;
}

export function AlbumCarousel({ albums, onSlideChange }: AlbumCarouselProps) {
  const [active, setActive] = useState(0);
  const total = albums.length;

  const isPaused = useRef(false);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const prev = useCallback(() => setActive(i => ((i - 1) + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);

  // Notify parent whenever active slide changes
  useEffect(() => {
    onSlideChange?.(active);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-play — uses ref for paused to avoid effect re-runs on hover
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  // Pointer drag (works for both mouse and touch via pointer events)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    didDrag.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) didDrag.current = true;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-2xl"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      }}
      tabIndex={0}
      role="region"
      aria-label="Featured albums"
    >
      {/* Track — each slide is min-w-full, transform shifts by 100% per slide */}
      <div
        className="flex h-[260px] sm:h-[380px] md:h-[500px] lg:h-[580px] cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: 'transform 520ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {albums.map((album, i) => (
          <Link
            key={album.slug}
            href={`/portfolio/${album.slug}`}
            className="relative min-w-full h-full block"
            draggable={false}
            tabIndex={i === active ? 0 : -1}
            aria-label={`${album.title} — ${album.category}`}
            onClick={(e) => {
              // Suppress navigation if the user just dragged
              if (didDrag.current) e.preventDefault();
            }}
          >
            <Image
              src={album.coverImage}
              alt={album.title}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority={i <= 1}
              draggable={false}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Slide text */}
            <div className="absolute bottom-6 left-6 right-16 md:bottom-10 md:left-10 md:right-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white/90 mb-3 md:mb-4">
                <span className="inline-block h-1 w-1 rounded-full bg-brand-accent" />
                {album.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                {album.title}
              </h3>
              <p className="mt-1 md:mt-2 text-white/55 text-xs sm:text-sm font-sans">
                {album.imageCount} photos
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous album"
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next album"
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 right-4 md:bottom-4 md:right-5 flex items-center gap-1.5">
        {albums.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setActive(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'rounded-full transition-all duration-300',
              i === active
                ? 'w-6 h-2 bg-brand-accent'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
}
