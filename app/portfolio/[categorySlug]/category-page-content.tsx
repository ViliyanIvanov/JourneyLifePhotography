'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { AlbumConfig } from '@/content/albums-data-full';

interface AlbumWithCover extends AlbumConfig {
  coverImage: string;
}

function CategorySkeleton() {
  return (
    <div className="relative z-10 min-h-screen">
      <section className="pt-32 md:pt-40 pb-8 md:pb-12">
        <Container className="text-center">
          <div className="h-12 w-48 mx-auto mb-4 rounded bg-brand-white/[0.04] animate-pulse" />
          <div className="h-5 w-72 mx-auto rounded bg-brand-white/[0.04] animate-pulse" />
        </Container>
      </section>
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-2xl bg-brand-white/[0.04] animate-pulse"
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function CategoryNotFound() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <Container>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-brand-white">
            Category not found
          </h1>
          <p className="mt-3 text-brand-white/70">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 mt-6 text-brand-accent hover:text-brand-accent/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default function CategoryPageContent() {
  const params = useParams<{ categorySlug: string }>();
  const categorySlug = params?.categorySlug;
  const router = useRouter();

  const [albums, setAlbums] = useState<AlbumWithCover[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategory() {
      if (!categorySlug) return;

      try {
        const { getAlbumsByCategory, slugToCategory } = await import(
          '@/content/albums-data-full'
        );

        const name = slugToCategory(categorySlug as string);
        if (!name) {
          setCategoryName(null);
          setIsLoading(false);
          return;
        }

        const categoryAlbums = getAlbumsByCategory(categorySlug as string) as AlbumWithCover[];

        // If only one album in this category, redirect directly to it
        if (categoryAlbums.length === 1) {
          router.replace(`/portfolio/${categorySlug}/${categoryAlbums[0].slug}`);
          return;
        }

        setCategoryName(name);
        setAlbums(categoryAlbums);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    }
    loadCategory();
  }, [categorySlug, router]);

  if (!categorySlug) {
    return <CategoryNotFound />;
  }

  if (isLoading) {
    return (
      <>
        <AtmosphereBackground photoUrl="/placeholder-album.jpg" darkness={85} />
        <CategorySkeleton />
      </>
    );
  }

  if (!categoryName) {
    return (
      <>
        <AtmosphereBackground photoUrl="/placeholder-album.jpg" darkness={85} />
        <CategoryNotFound />
      </>
    );
  }

  const atmosphereImage = albums[0]?.coverImage || '/placeholder-album.jpg';
  const totalPhotos = albums.reduce((sum, a) => sum + a.imageCount, 0);

  return (
    <>
      <AtmosphereBackground photoUrl={atmosphereImage} darkness={85} />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-12">
          <Container className="text-center">
            <ScrollAnimation direction="fade" delay={0}>
              <Breadcrumbs
                items={[
                  { name: 'Home', href: '/' },
                  { name: 'Portfolio', href: '/portfolio' },
                  { name: categoryName, href: `/portfolio/${categorySlug}` },
                ]}
              />
            </ScrollAnimation>

            <SplitText
              text={categoryName}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-white"
              delay={120}
            />
            <ScrollAnimation direction="up" delay={200}>
              <p className="mt-4 text-brand-white/60 text-base md:text-lg max-w-xl mx-auto font-light">
                {albums.length} album{albums.length !== 1 ? 's' : ''} &middot;{' '}
                {totalPhotos} photos
              </p>
            </ScrollAnimation>
            {/* Accent divider */}
            <ScrollAnimation direction="fade" delay={400}>
              <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>

        {/* Albums grid */}
        <section className="pb-24 md:pb-32">
          <Container>
            {/* Desktop grid */}
            <div className="hidden lg:grid grid-cols-3 gap-5">
              {albums.map((album, index) => (
                <ScrollAnimation
                  key={album.id}
                  direction={
                    index % 3 === 0
                      ? 'left'
                      : index % 3 === 2
                        ? 'right'
                        : 'up'
                  }
                  effect="float"
                  delay={index * 80}
                >
                  <Link href={`/portfolio/${categorySlug}/${album.slug}`}>
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

                        {/* Card info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                          <div className="flex items-center gap-3 mb-2">
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
              {albums.map((album, index) => (
                <ScrollAnimation
                  key={album.id}
                  direction="up"
                  effect="float"
                  delay={index * 80}
                >
                  <Link href={`/portfolio/${categorySlug}/${album.slug}`}>
                    <div className="group flex items-center gap-4 p-2 rounded-xl border border-brand-white/[0.06] bg-brand-white/[0.03] transition-all duration-300 active:shadow-[0_0_24px_rgba(176,204,209,0.15)]">
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
                        <p className="text-xs text-brand-white/40 mt-0.5">
                          {album.imageCount} photos
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
