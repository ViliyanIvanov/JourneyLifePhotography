import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { PhotoGrid } from '@/components/gallery/photo-grid';
import { mockAlbums, getMockPhotos } from '@/content/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Camera, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ albumSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { albumSlug } = await params;
  const album = mockAlbums.find((a) => a.slug === albumSlug);

  if (!album) {
    return createMetadata({ title: 'Album Not Found' });
  }

  return createMetadata({
    title: album.title,
    description: album.description,
    image: album.coverImage,
  });
}

export default async function AlbumPage({ params }: PageProps) {
  const { albumSlug } = await params;
  const album = mockAlbums.find((a) => a.slug === albumSlug);

  if (!album) {
    notFound();
  }

  const photos = getMockPhotos(album.id, 40);

  return (
    <>
      <main>
        {/* Album Header */}
        <section className="border-b border-brand-emerald/20 bg-brand-black text-brand-white py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-brand-emerald text-brand-white border-0">{album.category}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
                  {album.title}
                </h1>
                <p className="text-lg text-brand-white/70">
                  {album.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-brand-white/60">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span>{album.imageCount} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Photo Grid */}
        <section className="py-12 md:py-16 bg-brand-black">
          <Container>
            <PhotoGrid photos={photos} hasMore={false} />
          </Container>
        </section>
      </main>
    </>
  );
}

