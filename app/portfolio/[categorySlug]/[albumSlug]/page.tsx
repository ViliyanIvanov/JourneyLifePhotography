import type { Metadata } from 'next';
import { createMetadata, siteUrl } from '@/lib/seo';
import { getAlbumBySlug, getAlbumImages, getImageUrl, categoryToSlug } from '@/content/albums-data-full';
import { JsonLd } from '@/components/seo/json-ld';
import { createImageGallerySchema, createBreadcrumbSchema } from '@/lib/json-ld';
import AlbumPageContent from './album-page-content';

interface Props {
  params: Promise<{ categorySlug: string; albumSlug: string }>;
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

  const catSlug = categoryToSlug(album.category);
  const ogImage = album.coverImagePath
    ? `${siteUrl}${getImageUrl(album.coverImagePath)}`
    : undefined;

  return createMetadata({
    title: album.title,
    description:
      album.description ||
      `${album.title} — ${album.imageCount} photos in the ${album.category} collection by Iva Dimitrov Photography.`,
    image: ogImage,
    path: `/portfolio/${catSlug}/${album.slug}`,
  });
}

export default async function AlbumPage({ params }: Props) {
  const { albumSlug } = await params;
  const album = getAlbumBySlug(albumSlug);

  const catSlug = album ? categoryToSlug(album.category) : '';

  return (
    <>
      {album && (
        <JsonLd
          data={[
            createImageGallerySchema({
              title: album.title,
              slug: `${catSlug}/${album.slug}`,
              description: album.description,
              images: getAlbumImages(album.id).slice(0, 10).map((img) => ({
                url: img.url,
                alt: img.alt,
              })),
            }),
            createBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Portfolio', url: '/portfolio' },
              { name: album.category, url: `/portfolio/${catSlug}` },
              { name: album.title, url: `/portfolio/${catSlug}/${album.slug}` },
            ]),
          ]}
        />
      )}
      <AlbumPageContent />
    </>
  );
}
