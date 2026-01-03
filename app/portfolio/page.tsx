import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { AlbumGrid } from '@/components/gallery/album-grid';
import { mockAlbums } from '@/content/mock-data';

export const metadata = createMetadata({
  title: 'Portfolio',
  description:
    'Browse our photography portfolio featuring weddings, portraits, corporate events, and pet photography.',
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Explore our collection of photography work across different categories"
      />
      <main className="py-12 md:py-16 bg-brand-black min-h-screen">
        <Container>
          <AlbumGrid albums={mockAlbums} />
        </Container>
      </main>
    </>
  );
}

