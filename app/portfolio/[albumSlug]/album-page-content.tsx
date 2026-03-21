'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';
import { PhotoGrid } from '@/components/gallery/photo-grid';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

/** Strip `_thumb` from a thumbnail path to get the original filename. */
function toFullImagePath(thumbPath: string): string {
  return thumbPath.replace(/_thumb(\.[^.]+)$/, '$1');
}

function AlbumPageSkeleton() {
  return (
    <main className="relative z-10 min-h-screen">
      <section className="pt-32 md:pt-40 pb-8 md:pb-12">
        <Container className="text-center">
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-72 mx-auto" />
        </Container>
      </section>
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

function AlbumNotFound() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <Container>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-brand-white">
            Album not found
          </h1>
          <p className="mt-3 text-brand-white/70">
            The album you&apos;re looking for doesn&apos;t exist or isn&apos;t available.
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

export default function AlbumPageContent() {
  const params = useParams<{ albumSlug: string }>();
  const albumSlug = params?.albumSlug;

  const [album, setAlbum] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbum() {
      if (!albumSlug) return;

      try {
        const { getAlbumBySlug, getAlbumImages, getImageUrl } = await import(
          '@/content/albums-data-full'
        );
        const albumData = getAlbumBySlug(albumSlug as string);

        if (!albumData) {
          setError('Album not found');
          setIsLoading(false);
          return;
        }

        const images = getAlbumImages(albumData.id);

        // Build full-size base URL from env (backend serves originals)
        const fullImageBase =
          process.env.NEXT_PUBLIC_FULL_IMAGE_BASE_URL || '/JourneyLifePhotos';

        const converted = {
          id: albumData.id,
          title: albumData.title,
          description: albumData.description,
          slug: albumData.slug,
          category: albumData.category,
          isPrivate: albumData.isPrivate,
          coverImage: albumData.coverImagePath
            ? getImageUrl(albumData.coverImagePath)
            : '/placeholder-album.jpg',
          createdAt: albumData.createdAt,
          media: images.map((img, index) => ({
            id: `${albumData.id}-${index}`,
            fileName: img.fileName,
            mimeType: 'image/jpeg',
            // Full-size from backend (strip _thumb from path)
            webUrl: `${fullImageBase}${toFullImagePath(img.path)}`,
            // Thumbnail from local public folder
            thumbUrl: img.url,
            fileSize: 0,
            width: 1920,
            height: 1440,
            altText: img.alt,
            sortOrder: index,
            createdAt: albumData.createdAt,
          })),
        };

        setAlbum(converted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadAlbum();
  }, [albumSlug]);

  if (!albumSlug) {
    return <AlbumNotFound />;
  }

  if (isLoading) {
    return (
      <>
        <AtmosphereBackground photoUrl="/placeholder-album.jpg" darkness={88} />
        <AlbumPageSkeleton />
      </>
    );
  }

  if (error || !album) {
    if (error === 'Album not found') {
      return <AlbumNotFound />;
    }

    return (
      <main className="relative z-10 min-h-screen pt-32">
        <Container>
          <div className="text-center">
            <p className="text-brand-white/70 mb-4">Unable to load album</p>
            <p className="text-brand-white/50 text-sm">
              {error || 'Please try again later'}
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <>
      <AtmosphereBackground
        photoUrl={album.coverImage}
        darkness={88}
      />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-12">
          <Container className="text-center">
            <ScrollAnimation direction="fade" delay={0}>
              <Breadcrumbs
                items={[
                  { name: 'Home', href: '/' },
                  { name: 'Portfolio', href: '/portfolio' },
                  { name: album.title, href: `/portfolio/${album.slug}` },
                ]}
              />
            </ScrollAnimation>

            <SplitText
              text={album.title}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-white"
              delay={120}
            />

            <ScrollAnimation direction="up" delay={200}>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-brand-white/50">
                {album.category && (
                  <span className="text-[11px] uppercase tracking-[0.15em] text-brand-accent/80">
                    {album.category}
                  </span>
                )}
                <span>{album.media?.length || 0} photos</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(album.createdAt).toLocaleDateString()}
                </span>
              </div>
            </ScrollAnimation>

            {album.description && (
              <ScrollAnimation direction="up" delay={300}>
                <p className="mt-4 text-brand-white/60 text-base max-w-xl mx-auto font-light">
                  {album.description}
                </p>
              </ScrollAnimation>
            )}

            {/* Accent divider */}
            <ScrollAnimation direction="fade" delay={400}>
              <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>

        {/* Photo grid */}
        {album.media && album.media.length > 0 && (
          <section className="pb-24 md:pb-32">
            <Container>
              <PhotoGrid
                photos={album.media}
                initialLoadCount={20}
                loadMoreCount={16}
              />
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
