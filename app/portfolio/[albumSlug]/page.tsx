'use client';

import { useParams } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useAlbums } from '@/lib/api';

function AlbumPageSkeleton() {
  return (
    <main>
      <section className="bg-black text-brand-white py-24 md:py-32">
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
      <section className="py-16 md:py-24 bg-black">
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

function AlbumNotFound() {
  return (
    <main className="py-16 bg-black min-h-screen">
      <Container>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-brand-white">
            Album not found
          </h1>
          <p className="mt-3 text-brand-white/70">
            The album you’re looking for doesn’t exist or isn’t available.
          </p>
        </div>
      </Container>
    </main>
  );
}

export default function AlbumPage() {
  const params = useParams<{ albumSlug: string }>();
  const albumSlug = params?.albumSlug;

  const { data: albums, isLoading, error } = useAlbums();

  if (isLoading) {
    return <AlbumPageSkeleton />;
  }

  if (error) {
    return (
      <main className="py-16 bg-black min-h-screen">
        <Container>
          <div className="text-center">
            <p className="text-brand-white/70 mb-4">Unable to load album</p>
            <p className="text-brand-white/50 text-sm">{error.message}</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!albumSlug) {
    return <AlbumNotFound />;
  }

  const album = albums?.find((a) => a.slug === albumSlug || a.id === albumSlug);

  if (!album) {
    return <AlbumNotFound />;
  }

  const coverImageUrl =
    album.coverImage?.webUrl ||
    album.coverImage?.thumbUrl ||
    '/placeholder-album.jpg';

  return (
    <main>
      <section className="bg-black text-brand-white py-24 md:py-32">
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

      <section className="py-16 md:py-24 bg-black">
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
