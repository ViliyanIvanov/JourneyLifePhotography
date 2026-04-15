'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Button } from '@/components/ui/button';
import { albumsData, getImageUrl } from '@/content/albums-data';
import { categoryToSlug } from '@/content/albums-data-full';

/* ─── Featured albums: hand-picked for variety ─── */
const FEATURED_SLUGS = [
  'wedding-1',
  'architecture-interiors',
  'children-family',
  'travel-photography',
];

/* ─── Lower row cards: Corporate, Branding, Sports + Wedding ─── */
const LOWER_CARDS = [
  {
    slug: 'wedding-1',
    category: 'Weddings',
    title: 'Weddings',
    image: '/IvaDimitrovPhotos/acrossPages/card_wedding_palace.png',
    href: '/portfolio/weddings',
  },
  {
    slug: 'corporate',
    category: 'Corporate',
    title: 'Corporate',
    image: '/IvaDimitrovPhotos/acrossPages/card_corporate_or_branding_brunette.png',
    href: '/portfolio/corporate',
  },
  {
    slug: 'branding',
    category: 'Branding',
    title: 'Branding',
    image: '/IvaDimitrovPhotos/acrossPages/card_branding_child_swing.png',
    href: '/portfolio/branding',
  },
  {
    slug: 'sports',
    category: 'Sports',
    title: 'Sports',
    image: '/IvaDimitrovPhotos/acrossPages/card_sports_runner.png',
    href: '/portfolio/sports',
  },
];

const featuredAlbums = FEATURED_SLUGS.map(
  (slug) => albumsData.find((a) => a.slug === slug)!
).filter(Boolean);

/* ─── Card positions in the fanned state ─── */
const FAN_CONFIGS = [
  { rotate: -8, x: -180, delay: 0 },
  { rotate: -3, x: -60, delay: 0.06 },
  { rotate: 3, x: 60, delay: 0.12 },
  { rotate: 8, x: 180, delay: 0.18 },
];

/* ─── Stacked offsets before fan ─── */
const STACK_CONFIGS = [
  { rotate: -4, x: -6, y: 8 },
  { rotate: 2, x: 4, y: -4 },
  { rotate: -1, x: -2, y: 3 },
  { rotate: 3, x: 5, y: -6 },
];

function FanCard({
  album,
  index,
  progress,
}: {
  album: (typeof featuredAlbums)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const fan = FAN_CONFIGS[index];
  const stack = STACK_CONFIGS[index];

  const rotate = useTransform(progress, [0, 1], [stack.rotate, fan.rotate]);
  const x = useTransform(progress, [0, 1], [stack.x, fan.x]);
  const y = useTransform(progress, [0, 1], [stack.y, 0]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      className="absolute"
      style={{
        rotate,
        x,
        y,
        scale,
        zIndex: index,
      }}
      whileHover={{
        y: -20,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <Link
        href={`/portfolio/${categoryToSlug(album.category)}/${album.slug}`}
        className="group block w-[250px] h-[350px] rounded-2xl overflow-hidden border border-brand-white/[0.06] relative cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(176,204,209,0.3)]"
      >
        <Image
          src={getImageUrl(album.coverImagePath)}
          alt={album.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="250px"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-brand-accent/90 font-medium mb-1.5">
            {album.category}
          </span>
          <h3 className="text-base font-serif font-semibold text-brand-white leading-snug">
            {album.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Mobile vertical mini-fan configs ─── */
const MOBILE_FAN = [
  { rotate: -3, x: -8 },
  { rotate: 2, x: 12 },
  { rotate: -2, x: -6 },
  { rotate: 3, x: 10 },
];

/* ─── Main section ─── */
export function PortfolioShowcaseSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Clamp progress to 0–1 with a slight spring feel
  const progress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-transparent overflow-hidden"
    >
      {/* Ambient accent glow — hidden on mobile (invisible at 4% opacity + 120px blur, but expensive for mobile GPU) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-accent/[0.04] blur-[120px] will-change-transform" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-16 text-center max-w-3xl mx-auto">
          <ScrollAnimation direction="fade" effect="blur" delay={80}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-6 leading-tight">
              <SplitText
                text="Our Portfolio"
                delay={120}
                className="inline"
              />
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={160}>
            <p className="text-lg text-brand-white/70 leading-relaxed">
              A glimpse into the moments we&apos;ve had the privilege to capture.
            </p>
          </ScrollAnimation>
        </div>

        {/* Desktop: fan animation */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center h-[420px] mb-12">
            {prefersReduced
              ? /* No animation — just lay out horizontally */
                featuredAlbums.map((album, i) => (
                  <div
                    key={album.slug}
                    className="mx-3"
                    style={{ transform: `rotate(${FAN_CONFIGS[i].rotate}deg)` }}
                  >
                    <Link
                      href={`/portfolio/${categoryToSlug(album.category)}/${album.slug}`}
                      className="group block w-[250px] h-[350px] rounded-2xl overflow-hidden border border-brand-white/[0.06] relative cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(176,204,209,0.3)]"
                    >
                      <Image
                        src={getImageUrl(album.coverImagePath)}
                        alt={album.title}
                        fill
                        className="object-cover object-top"
                        sizes="250px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-brand-accent/90 font-medium mb-1.5">
                          {album.category}
                        </span>
                        <h3 className="text-base font-serif font-semibold text-brand-white leading-snug">
                          {album.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))
              : featuredAlbums.map((album, i) => (
                  <FanCard
                    key={album.slug}
                    album={album}
                    index={i}
                    progress={progress}
                  />
                ))}
          </div>
        </div>

        {/* Mobile: vertical mini-fan */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center gap-[-20px] space-y-[-28px]">
            {featuredAlbums.map((album, i) => (
              <ScrollAnimation
                key={album.slug}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={120 + i * 100}
              >
                <Link
                  href={`/portfolio/${categoryToSlug(album.category)}/${album.slug}`}
                  className="group block relative"
                  style={{
                    transform: `rotate(${MOBILE_FAN[i].rotate}deg) translateX(${MOBILE_FAN[i].x}px)`,
                    zIndex: featuredAlbums.length - i,
                  }}
                >
                  <div className="w-[280px] h-[160px] rounded-2xl overflow-hidden border border-brand-white/[0.06] relative transition-all duration-500 active:scale-[1.03] active:shadow-[0_0_24px_rgba(176,204,209,0.3)]">
                    <Image
                      src={getImageUrl(album.coverImagePath)}
                      alt={album.title}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-brand-accent/90 font-medium mb-1">
                        {album.category}
                      </span>
                      <h3 className="text-sm font-serif font-semibold text-brand-white leading-snug">
                        {album.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Lower cards row */}
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {LOWER_CARDS.map((card, i) => (
              <ScrollAnimation
                key={card.slug}
                direction="up"
                delay={100 + i * 80}
              >
                <Link href={card.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-brand-white/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_24px_rgba(176,204,209,0.2)]">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                        <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-brand-accent/90 font-medium mb-1">
                          {card.category}
                        </span>
                        <h3 className="text-sm lg:text-base font-serif font-semibold text-brand-white leading-snug">
                          {card.title}
                        </h3>
                        <div className="h-0.5 w-0 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out mt-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollAnimation direction="fade" effect="float" delay={300}>
          <div className="text-center mt-8 lg:mt-10">
            <Button variant="secondary" asChild>
              <Link href="/portfolio">View All Albums</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
