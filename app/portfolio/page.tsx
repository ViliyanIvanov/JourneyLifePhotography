'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Lock } from 'lucide-react';
import type { AlbumConfig } from '@/content/albums-data-full';

interface AlbumWithCover extends AlbumConfig {
  coverImage: string;
}

export default function PortfolioPage() {
  const [albums, setAlbums] = useState<AlbumWithCover[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAlbums() {
      try {
        const { getAllAlbums } = await import('@/content/albums-data-full');
        const data = getAllAlbums() as AlbumWithCover[];
        setAlbums(data);
      } catch {
        // silently fail — empty grid
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbums();
  }, []);

  const publicAlbums = albums.filter((a) => !a.isPrivate);

  // Use the first album cover as atmosphere background
  const atmosphereImage = publicAlbums[0]?.coverImage || '/placeholder-album.jpg';

  return (
    <>
      <AtmosphereBackground photoUrl={atmosphereImage} darkness={85} />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-12">
          <Container className="text-center">
            <SplitText
              text="Portfolio"
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-white"
              delay={120}
            />
            <ScrollAnimation direction="up" delay={200}>
              <p className="mt-4 text-brand-white/60 text-base md:text-lg max-w-xl mx-auto font-light">
                Each album tells a unique story, captured with artistry and
                attention to detail.
              </p>
            </ScrollAnimation>
            {/* Accent divider */}
            <ScrollAnimation direction="fade" delay={400}>
              <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>

        {/* Content */}
        <section className="pb-24 md:pb-32">
          <Container>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] rounded-2xl bg-brand-white/[0.04] animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                {/* Desktop: 3-column aligned grid, capped at 380px height */}
                <div className="hidden lg:grid grid-cols-3 gap-5">
                  {publicAlbums.map((album, index) => (
                      <ScrollAnimation
                        key={album.id}
                        direction="up"
                        effect="float"
                        delay={index * 80}
                      >
                        <Link
                          href={
                            album.isPrivate
                              ? `/private/${album.slug}`
                              : `/portfolio/${album.slug}`
                          }
                        >
                          <div className="group relative overflow-hidden rounded-2xl border border-brand-white/[0.06] card-glow-hover transition-all duration-500 hover:-translate-y-1.5">
                            <div className="relative h-[340px] overflow-hidden">
                              <Image
                                src={album.coverImage}
                                alt={album.title}
                                fill
                                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 1400px) 33vw, 380px"
                              />
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />

                              {album.isPrivate && (
                                <div className="absolute top-4 right-4 bg-brand-black/70 backdrop-blur-sm rounded-full p-2">
                                  <Lock className="h-4 w-4 text-brand-white" />
                                </div>
                              )}

                              {/* Card info */}
                              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-[11px] uppercase tracking-[0.15em] text-brand-accent/80 font-medium">
                                    {album.category}
                                  </span>
                                  <span className="text-brand-white/30 text-[11px]">
                                    {album.imageCount} photos
                                  </span>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-serif text-brand-white font-light">
                                  {album.title}
                                </h3>
                                <div className="h-0.5 w-0 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out mt-3" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </ScrollAnimation>
                  ))}
                </div>

                {/* Mobile: compact list rows */}
                <div className="flex flex-col gap-3 lg:hidden">
                  {publicAlbums.map((album, index) => (
                    <ScrollAnimation
                      key={album.id}
                      direction="up"
                      effect="float"
                      delay={index * 80}
                    >
                      <Link
                        href={
                          album.isPrivate
                            ? `/private/${album.slug}`
                            : `/portfolio/${album.slug}`
                        }
                      >
                        <div className="group flex items-center gap-4 p-2 rounded-xl border border-brand-white/[0.06] bg-brand-white/[0.03] transition-all duration-300 active:shadow-[0_0_24px_rgba(196,137,138,0.15)]">
                          {/* Thumbnail */}
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={album.coverImage}
                              alt={album.title}
                              fill
                              className="object-cover object-top"
                              sizes="80px"
                            />
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-base text-brand-white truncate">
                              {album.title}
                            </h3>
                            <p className="text-xs text-brand-accent/80 mt-0.5">
                              {album.category}
                            </p>
                            <p className="text-xs text-brand-white/40 mt-0.5">
                              {album.imageCount} photos
                            </p>
                          </div>
                          {album.isPrivate && (
                            <Lock className="h-4 w-4 text-brand-white/40 flex-shrink-0 mr-2" />
                          )}
                        </div>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      </div>
    </>
  );
}
