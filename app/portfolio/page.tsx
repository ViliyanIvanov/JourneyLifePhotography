'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { AlbumGrid } from '@/components/gallery/album-grid';
import { useAlbums } from '@/lib/api';

export default function PortfolioPage() {
  const { data: albums, isLoading, error } = useAlbums();

  // Filter to only show public, published albums
  const publicAlbums = albums?.filter((album) => !album.isPrivate) || [];

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Explore our collection of photography work across different categories"
      />
      <main className="py-12 md:py-16 bg-brand-black min-h-screen">
        <Container>
          {error && (
            <div className="text-center py-12">
              <p className="text-brand-white/70 mb-4">Unable to load albums</p>
              <p className="text-brand-white/50 text-sm">{error.message}</p>
            </div>
          )}
          <AlbumGrid albums={publicAlbums} isLoading={isLoading} />
        </Container>
      </main>
    </>
  );
}
