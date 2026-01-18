'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { PhotoGrid } from '@/components/gallery/photo-grid';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Camera, Calendar } from 'lucide-react';
import { useAlbums, type AlbumDto, type MediaAssetDto } from '@/lib/api';

interface PageProps {
  params: Promise<{ albumSlug: string }>;
}

function AlbumPageSkeleton() {
  return (
    <main>
      <section className="border-b border-brand-emerald/20 bg-brand-black text-brand-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Skeleton className="aspect-[4/3] rounded-lg" />
            <div className="flex flex-col justify-center space-y-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-12 md:py-16 bg-brand-black">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

// Convert MediaAssetDto to Photo format for PhotoGrid
function mediaToPhotos(media: MediaAssetDto[]) {
  return media.map((m) => ({
    id: m.id,
    url: m.webUrl || m.originalUrl || m.thumbUrl,
    thumbnailUrl: m.thumbUrl,
    alt: m.altText || m.fileName,
    width: m.width,
    height: m.height,
  }));
}

export default function AlbumPage({ params }: PageProps) {
  const { albumSlug } = use(params);
  const { data: albums, isLoading, error } = useAlbums();

  if (isLoading) {
    return <AlbumPageSkeleton />;
  }

  if (error) {
    return (
      <main className="py-16 bg-brand-black min-h-screen">
        <Container>
          <div className="text-center">
            <p className="text-brand-white/70 mb-4">Unable to load album</p>
            <p className="text-brand-white/50 text-sm">{error.message}</p>
          </div>
        </Container>
      </main>
    );
  }

  // Find album by slug or id
  const album = albums?.find(
    (a) => a.slug === albumSlug || a.id === albumSlug
  );

  if (!album) {
    notFound();
  }

  // For public albums, we show the cover image and basic info
  // Photos would need to come from a separate endpoint or be included in the album
  const coverImageUrl =
    album.coverImage?.webUrl ||
    album.coverImage?.thumbUrl ||
    '/placeholder-album.jpg';

  return (
    <main>
      {/* Album Header */}
      <section className="border-b border-brand-emerald/20 bg-brand-black text-brand-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={album.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
                {album.title}
              </h1>
              {album.description && (
                <p className="text-lg text-brand-white/70">{album.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-brand-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Photo Grid - placeholder until we have album media endpoint */}
      <section className="py-12 md:py-16 bg-brand-black">
        <Container>
          <div className="text-center py-12">
            <p className="text-brand-white/70">
              Photos will be displayed here when the album is loaded with its media.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
