import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createMetadata, siteUrl } from '@/lib/seo';
import { slugToCategory, getAlbumsByCategory, getCategories, categoryToSlug } from '@/content/albums-data-full';
import { JsonLd } from '@/components/seo/json-ld';
import { createBreadcrumbSchema } from '@/lib/json-ld';
import CategoryPageContent from './category-page-content';

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const categoryName = slugToCategory(categorySlug);

  if (!categoryName) {
    return createMetadata({
      title: 'Category Not Found',
      noindex: true,
    });
  }

  const albums = getAlbumsByCategory(categorySlug);

  // Single-album categories redirect, so no metadata needed
  if (albums.length === 1) {
    return {};
  }

  const totalPhotos = albums.reduce((sum, a) => sum + a.imageCount, 0);

  return createMetadata({
    title: `${categoryName} Photography`,
    description: `Browse ${albums.length} ${categoryName.toLowerCase()} album${albums.length !== 1 ? 's' : ''} — ${totalPhotos} photos by Iva Dimitrov Photography.`,
    path: `/portfolio/${categorySlug}`,
  });
}

export async function generateStaticParams() {
  return getCategories().map((cat) => ({
    categorySlug: categoryToSlug(cat),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const categoryName = slugToCategory(categorySlug);

  // If category has only one album, redirect directly to it
  if (categoryName) {
    const albums = getAlbumsByCategory(categorySlug);
    if (albums.length === 1) {
      redirect(`/portfolio/${categorySlug}/${albums[0].slug}`);
    }
  }

  return (
    <>
      {categoryName && (
        <JsonLd
          data={[
            createBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Portfolio', url: '/portfolio' },
              { name: categoryName, url: `/portfolio/${categorySlug}` },
            ]),
          ]}
        />
      )}
      <CategoryPageContent />
    </>
  );
}
