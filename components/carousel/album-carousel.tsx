'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CarouselAlbum {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  fullImage?: string;
  imageCount: number;
}

interface AlbumCarouselProps {
  albums: CarouselAlbum[];
}

/* ------------------------------------------------------------------ */
/*  Layout specs (% of container)                                      */
/* ------------------------------------------------------------------ */

interface LayoutSpec {
  heroW: number;
  neighborW: number;
  gap: number;
  gutter: number;
}

const LAYOUT_DESKTOP: LayoutSpec = { heroW: 60, neighborW: 23, gap: 2.5, gutter: 7 };
const LAYOUT_TABLET: LayoutSpec  = { heroW: 74, neighborW: 20, gap: 2, gutter: 2 };
const LAYOUT_MOBILE: LayoutSpec  = { heroW: 88, neighborW: 10, gap: 1.5, gutter: 5 };

function getLayout(w: number): LayoutSpec {
  if (w >= 1025) return LAYOUT_DESKTOP;
  if (w >= 481) return LAYOUT_TABLET;
  return LAYOUT_MOBILE;
}

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const SNAP_MS = 450;
const AUTO_PLAY_MS = 6000;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AlbumCarousel({ albums }: AlbumCarouselProps) {
  const total = albums.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackEl = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotProgressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cw, setCw] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Key that increments on each slide change to trigger text CSS animation
  const [slideKey, setSlideKey] = useState(0);

  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ---- Measure ----
  useEffect(() => {
    const measure = () => { if (containerRef.current) setCw(containerRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const layout = getLayout(cw || (typeof window !== 'undefined' ? window.innerWidth : 1200));
  const heroW = (cw * layout.heroW) / 100;
  const neighborW = (cw * layout.neighborW) / 100;
  const gapPx = (cw * layout.gap) / 100;
  const gutterPx = (cw * layout.gutter) / 100;
  const slideStep = neighborW + gapPx;

  // ---- Card geometry for a given active index ----
  const getCardGeometry = useCallback((active: number) => {
    const positions: { left: number; width: number }[] = [];
    let cursor = 0;
    for (let i = 0; i < total; i++) {
      const w = i === active ? heroW : neighborW;
      positions.push({ left: cursor, width: w });
      cursor += w + gapPx;
    }
    return { positions, totalWidth: cursor > gapPx ? cursor - gapPx : 0 };
  }, [total, heroW, neighborW, gapPx]);

  const getTargetX = useCallback(
    (idx: number) => gutterPx - idx * slideStep,
    [gutterPx, slideStep]
  );

  // ---- Imperative animation ----
  const trackXRef = useRef(0);
  const rafRef = useRef(0);
  const animating = useRef(false);
  const animFrom = useRef(0);
  const animTo = useRef(0);
  const animStart = useRef(0);
  const suppressClick = useRef(false);

  const renderTrack = useCallback(() => {
    if (trackEl.current) trackEl.current.style.transform = `translate3d(${trackXRef.current}px,0,0)`;
  }, []);

  const applyCardStyles = useCallback((active: number) => {
    const { positions, totalWidth } = getCardGeometry(active);
    if (trackEl.current) trackEl.current.style.width = `${totalWidth}px`;

    for (let i = 0; i < total; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const pos = positions[i];
      const dist = Math.abs(i - active);
      const isActive = dist === 0;
      const scale = isActive ? 1 : dist === 1 ? 0.97 : 0.94;
      const opacity = isActive ? 1 : dist === 1 ? 0.55 : 0.3;

      el.style.left = `${pos.left}px`;
      el.style.width = `${pos.width}px`;
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
    }
  }, [getCardGeometry, total]);

  const snapTo = useCallback((target: number, done?: () => void) => {
    if (animating.current) cancelAnimationFrame(rafRef.current);
    animFrom.current = trackXRef.current;
    animTo.current = target;
    animStart.current = performance.now();
    animating.current = true;
    const dur = reducedMotion.current ? 60 : SNAP_MS;

    const tick = (now: number) => {
      const t = Math.min((now - animStart.current) / dur, 1);
      trackXRef.current = animFrom.current + (animTo.current - animFrom.current) * easeOutCubic(t);
      renderTrack();
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else { animating.current = false; done?.(); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [renderTrack]);

  // ---- Navigation ----
  const goTo = useCallback((idx: number) => {
    const i = Math.max(0, Math.min(total - 1, idx));
    setActiveIndex(i);
    setSlideKey(k => k + 1);
    applyCardStyles(i);
    snapTo(getTargetX(i));
  }, [total, applyCardStyles, snapTo, getTargetX]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // ---- Init / resize sync ----
  useEffect(() => {
    applyCardStyles(activeIndex);
    trackXRef.current = getTargetX(activeIndex);
    renderTrack();
  }, [cw, activeIndex, applyCardStyles, getTargetX, renderTrack]);

  // ---- Nearest index ----
  const nearest = useCallback((x: number) => {
    if (slideStep === 0) return 0;
    return Math.max(0, Math.min(total - 1, Math.round((gutterPx - x) / slideStep)));
  }, [gutterPx, slideStep, total]);

  // ================================================================
  //  POINTER DRAG
  // ================================================================
  const drag = useRef({ active: false, id: -1, sx: 0, sy: 0, stx: 0, lx: 0, lt: 0, locked: '' as '' | 'h' | 'v', dx: 0 });

  const dragTarget = useRef<HTMLElement | null>(null);

  const onDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (animating.current) { cancelAnimationFrame(rafRef.current); animating.current = false; }
    // Don't capture pointer here — let click events reach Link naturally.
    // Capture will happen in onMove only if a horizontal drag is confirmed.
    dragTarget.current = e.currentTarget as HTMLElement;
    const d = drag.current;
    d.active = true; d.id = e.pointerId;
    d.sx = e.clientX; d.sy = e.clientY; d.stx = trackXRef.current;
    d.lx = e.clientX; d.lt = e.timeStamp; d.locked = ''; d.dx = 0;
    suppressClick.current = false;
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.locked) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        d.locked = Math.abs(dy) > Math.abs(dx) ? 'v' : 'h';
        if (d.locked === 'v') { d.active = false; return; }
        // Now that we confirmed horizontal drag, capture pointer to track
        if (d.locked === 'h' && dragTarget.current) {
          try { dragTarget.current.setPointerCapture(e.pointerId); } catch {}
        }
      } else return;
    }
    if (d.locked !== 'h') return;
    e.preventDefault();
    d.lx = e.clientX; d.lt = e.timeStamp; d.dx = dx;
    let nx = d.stx + dx;
    const mx = getTargetX(0), mn = getTargetX(total - 1);
    if (nx > mx) nx = mx + (nx - mx) * 0.3;
    else if (nx < mn) nx = mn + (nx - mn) * 0.3;
    trackXRef.current = nx;
    renderTrack();
  }, [getTargetX, total, renderTrack]);

  const onUp = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    if (e.pointerId !== d.id) return;
    if (d.locked !== 'h') { d.active = false; return; }
    d.active = false;
    if (Math.abs(d.dx) > 8) { suppressClick.current = true; setTimeout(() => { suppressClick.current = false; }, 80); }
    const vel = (e.clientX - d.lx) / Math.max(1, e.timeStamp - d.lt);
    const thresh = slideStep * 0.15;
    let t = activeIndex;
    if (Math.abs(d.dx) > thresh) t = d.dx < 0 ? activeIndex + 1 : activeIndex - 1;
    else if (Math.abs(vel) > 0.4) t = vel < 0 ? activeIndex + 1 : activeIndex - 1;
    else t = nearest(trackXRef.current);
    goTo(Math.max(0, Math.min(total - 1, t)));
  }, [activeIndex, slideStep, total, nearest, goTo]);

  const onCancel = useCallback(() => { drag.current.active = false; snapTo(getTargetX(activeIndex)); }, [activeIndex, snapTo, getTargetX]);

  // ---- Wheel ----
  const wt = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wa = useRef(0);
  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const h = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 2) return;
      e.preventDefault(); wa.current += e.deltaX;
      if (wt.current) clearTimeout(wt.current);
      wt.current = setTimeout(() => { const d = wa.current; wa.current = 0; if (d > 30) goNext(); else if (d < -30) goPrev(); }, 150);
    };
    el.addEventListener('wheel', h, { passive: false });
    return () => { el.removeEventListener('wheel', h); if (wt.current) clearTimeout(wt.current); };
  }, [goNext, goPrev]);

  // ---- Keyboard ----
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
  }, [goNext, goPrev]);

  // ---- Auto-play (imperatively updates all dot progress bars) ----
  const apRaf = useRef(0);
  useEffect(() => {
    if (isPaused) { cancelAnimationFrame(apRaf.current); return; }
    const t0 = performance.now();
    const tick = () => {
      const p = Math.min((performance.now() - t0) / AUTO_PLAY_MS, 1);
      // Update all dot progress bars imperatively
      for (let i = 0; i < total; i++) {
        const bar = dotProgressRefs.current[i];
        if (bar) bar.style.transform = `scaleX(${i === activeIndex ? p : 0})`;
      }
      if (p >= 1) { goTo(activeIndex < total - 1 ? activeIndex + 1 : 0); return; }
      apRaf.current = requestAnimationFrame(tick);
    };
    apRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(apRaf.current);
  }, [activeIndex, isPaused, total, goTo]);

  // Reset progress bars when activeIndex changes
  useEffect(() => {
    for (let i = 0; i < total; i++) {
      const bar = dotProgressRefs.current[i];
      if (bar) bar.style.transform = `scaleX(0)`;
    }
  }, [activeIndex, total]);

  // ---- Initial geometry ----
  const { positions: initPositions, totalWidth: initTotalWidth } = getCardGeometry(activeIndex);
  const hCls = cw >= 1025 ? 'h-[clamp(360px,58vh,580px)]' : cw >= 481 ? 'h-[clamp(320px,55vh,540px)]' : 'h-[clamp(300px,52vh,480px)]';

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured albums"
      tabIndex={0}
      onKeyDown={onKey}
    >
      {/* Inline keyframes for text entrance */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes card-text-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-text-enter { animation: card-text-in 500ms cubic-bezier(0.22,1,0.36,1) both; }
        .card-text-enter-delay1 { animation: card-text-in 500ms cubic-bezier(0.22,1,0.36,1) 80ms both; }
        .card-text-enter-delay2 { animation: card-text-in 500ms cubic-bezier(0.22,1,0.36,1) 160ms both; }
      `}} />

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
      >
        <div
          ref={trackEl}
          className="relative will-change-transform"
          style={{ width: initTotalWidth }}
        >
          <div className={cn('relative w-full', hCls)}>
            {albums.map((album, i) => {
              const pos = initPositions[i];
              const isActive = i === activeIndex;
              const dist = Math.abs(i - activeIndex);

              return (
                <div
                  key={album.slug}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute top-0"
                  style={{
                    left: pos.left,
                    width: pos.width,
                    height: '100%',
                    transform: `scale(${isActive ? 1 : dist === 1 ? 0.97 : 0.94})`,
                    opacity: isActive ? 1 : dist === 1 ? 0.55 : 0.3,
                    transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}: ${album.title}`}
                >
                  <Link
                    href={`/portfolio/${album.slug}`}
                    className={cn(
                      'group block relative w-full h-full overflow-hidden rounded-2xl lg:rounded-3xl',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50',
                      isActive
                        ? 'shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)]'
                        : 'shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)]'
                    )}
                    tabIndex={isActive ? 0 : -1}
                    draggable={false}
                    onClick={(e) => {
                      if (suppressClick.current) { e.preventDefault(); e.stopPropagation(); }
                      // All clicks navigate — Link handles it naturally
                    }}
                  >
                    <Image
                      src={album.fullImage || album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 88vw, (max-width: 1024px) 74vw, 60vw"
                      priority={i <= 1}
                      draggable={false}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

                    {/* Category pill */}
                    <div className="absolute left-[6%] top-[8%]">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-white/90',
                          isActive && 'card-text-enter'
                        )}
                        key={isActive ? `pill-${slideKey}` : undefined}
                      >
                        <span className="inline-block h-1 w-1 rounded-full bg-brand-accent" />
                        {album.category}
                      </span>
                    </div>

                    {/* Title + meta with entrance animation */}
                    <div className="absolute left-[6%] right-[6%] bottom-[6%]">
                      <h3
                        className={cn(
                          'font-serif font-bold text-white leading-[1.1] tracking-tight',
                          isActive
                            ? 'text-xl sm:text-2xl lg:text-3xl'
                            : 'text-sm sm:text-base lg:text-lg',
                          isActive && 'card-text-enter-delay1'
                        )}
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                        key={isActive ? `title-${slideKey}` : undefined}
                      >
                        {album.title}
                      </h3>
                      {isActive && (
                        <div
                          className="mt-2 flex items-center justify-between card-text-enter-delay2"
                          key={`meta-${slideKey}`}
                        >
                          <p className="font-sans text-xs sm:text-sm text-white/45">{album.imageCount} photos</p>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots — all progress bars always mounted, updated imperatively */}
      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel navigation">
        {albums.map((album, i) => {
          const on = i === activeIndex;
          return (
            <button
              key={album.slug}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={on}
              aria-label={`Go to ${album.title}`}
              className={cn(
                'relative overflow-hidden rounded-full transition-all duration-300',
                on ? 'h-2.5 w-8 bg-white/20' : 'h-2 w-2 bg-white/20 hover:bg-white/40'
              )}
            >
              <div
                ref={(el) => { dotProgressRefs.current[i] = el; }}
                className={cn(
                  'absolute inset-0 rounded-full origin-left',
                  on ? 'bg-brand-accent' : 'bg-transparent'
                )}
                style={{ transform: 'scaleX(0)' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
