import type { MetadataRoute } from 'next';
import { getAllAlbums, categoryToSlug } from '@/content/albums-data-full';
import { serverFetch } from '@/lib/api/server';
import { siteUrl } from '@/lib/seo';
import type { PagedResponse, BlogPostSummaryDto } from '@/lib/api/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic album pages (exclude private albums)
  const albums = getAllAlbums().filter((a) => !a.isPrivate);
  const albumPages: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${siteUrl}/portfolio/${categoryToSlug(album.category)}/${album.slug}`,
    lastModified: album.createdAt || now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogData = await serverFetch<PagedResponse<BlogPostSummaryDto>>(
      '/blog?page=1&pageSize=100'
    );
    if (blogData?.items) {
      blogPages = blogData.items.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt || now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Blog API unavailable — skip blog pages in sitemap
  }

  return [...staticPages, ...albumPages, ...blogPages];
}
