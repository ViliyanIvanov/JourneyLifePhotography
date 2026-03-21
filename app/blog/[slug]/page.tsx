import type { Metadata } from 'next';
import { createMetadata, siteUrl } from '@/lib/seo';
import { serverFetch } from '@/lib/api/server';
import type { BlogPostDto } from '@/lib/api/types';
import { JsonLd } from '@/components/seo/json-ld';
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/json-ld';
import BlogPostContent from './blog-post-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await serverFetch<BlogPostDto>(`/blog/${slug}`);

  if (!post) {
    return createMetadata({
      title: 'Article Not Found',
      noindex: true,
    });
  }

  const ogImage =
    post.featuredImage?.webUrl || post.featuredImage?.thumbUrl || undefined;

  return createMetadata({
    title: post.title,
    description:
      post.excerpt ||
      `Read "${post.title}" on the Iva Dimitrov Photography journal.`,
    image: ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : undefined,
    path: `/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: ['Iva Dimitrov'],
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await serverFetch<BlogPostDto>(`/blog/${slug}`);

  return (
    <>
      {post && (
        <JsonLd
          data={[
            createArticleSchema(post),
            createBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Journal', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ]}
        />
      )}
      <BlogPostContent params={{ slug } as any} />
    </>
  );
}
