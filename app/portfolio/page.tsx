'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { AlbumGrid } from '@/components/gallery/album-grid';

export default function PortfolioPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbums() {
      try {
        const { getAllAlbums } = await import('@/content/albums-data-full');
        const data = getAllAlbums();

        // Convert to AlbumDto format
        const converted = data.map(album => ({
          id: album.id,
          title: album.title,
          description: album.description,
          slug: album.slug,
          isPrivate: album.isPrivate,
          coverImage: {
            id: album.id,
            fileName: album.slug,
            mimeType: 'image/jpeg',
            webUrl: (album as any).coverImageFull || album.coverImage,
            thumbUrl: album.coverImage,
            fileSize: 0,
            width: 1920,
            height: 1440,
            sortOrder: 0,
            createdAt: album.createdAt,
          },
          sortOrder: 0,
          createdAt: album.createdAt,
        }));

        setAlbums(converted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadAlbums();
  }, []);

  // Filter to only show public, published albums
  const publicAlbums = albums.filter((album) => !album.isPrivate);

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Explore our collection of curated photography work. Each album tells a unique story, captured with artistry and attention to detail."
      />
      <main className="py-24 md:py-32 bg-black min-h-screen">
        <Container>
          {error && (
            <div className="text-center py-12">
              <p className="text-brand-white/70 mb-4">Unable to load albums</p>
              <p className="text-brand-white/50 text-sm">{error}</p>
            </div>
          )}
          <AlbumGrid albums={publicAlbums} isLoading={isLoading} />
        </Container>
      </main>
    </>
  );
}
