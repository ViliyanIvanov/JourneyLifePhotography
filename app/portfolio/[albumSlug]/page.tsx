import type { Metadata } from 'next';
import { createMetadata, siteUrl } from '@/lib/seo';
import { getAlbumBySlug, getAlbumImages, getImageUrl } from '@/content/albums-data-full';
import { JsonLd } from '@/components/seo/json-ld';
import { createImageGallerySchema, createBreadcrumbSchema } from '@/lib/json-ld';
import AlbumPageContent from './album-page-content';

interface Props {
  params: Promise<{ albumSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { albumSlug } = await params;
  const album = getAlbumBySlug(albumSlug);

  if (!album) {
    return createMetadata({
      title: 'Album Not Found',
      noindex: true,
    });
  }

  const ogImage = album.coverImagePath
    ? `${siteUrl}${getImageUrl(album.coverImagePath)}`
    : undefined;

  return createMetadata({
    title: album.title,
    description:
      album.description ||
      `${album.title} — ${album.imageCount} photos in the ${album.category} collection by Iva Dimitrov Photography.`,
    image: ogImage,
    path: `/portfolio/${album.slug}`,
  });
}

export default async function AlbumPage({ params }: Props) {
  const { albumSlug } = await params;
  const album = getAlbumBySlug(albumSlug);

  return (
    <>
      {album && (
        <JsonLd
          data={[
            createImageGallerySchema({
              title: album.title,
              slug: album.slug,
              description: album.description,
              images: getAlbumImages(album.id).slice(0, 10).map((img) => ({
                url: img.url,
                alt: img.alt,
              })),
            }),
            createBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Portfolio', url: '/portfolio' },
              { name: album.title, url: `/portfolio/${album.slug}` },
            ]),
          ]}
        />
      )}
      <AlbumPageContent />
    </>
  );
}
