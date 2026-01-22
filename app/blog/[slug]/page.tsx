'use client';

import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useBlogPost } from '@/lib/api';

interface PageProps {
  params: { slug: string };
}

function PostSkeleton() {
  return (
    <main>
      <article className="py-12 md:py-16 bg-brand-black">
        <Container className="max-w-4xl">
          <div className="mb-12">
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-12 w-1/2 mb-6" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
          <Skeleton className="aspect-video mb-12 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </Container>
      </article>
    </main>
  );
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const { data: post, isLoading, error } = useBlogPost(slug);

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error) {
    if (error.statusCode === 404) {
      notFound();
    }
    return (
      <main className="py-16 bg-brand-black min-h-screen">
        <Container>
          <div className="text-center">
            <p className="text-brand-white/70 mb-4">Unable to load blog post</p>
            <p className="text-brand-white/50 text-sm">{error.message}</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  const tags = post.tags?.split(',').map((t) => t.trim()).filter(Boolean) || [];
  const coverImageUrl = post.featuredImage?.webUrl || post.featuredImage?.thumbUrl || '/placeholder-blog.jpg';

  return (
    <main>
      <article className="py-12 md:py-16 bg-brand-black">
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <Badge key={tag} className="bg-brand-white/10 text-brand-white border border-brand-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif text-brand-white">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-brand-white/60">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {post.featuredImage && (
            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-white prose-p:text-brand-white/90 prose-a:text-brand-emerald prose-strong:text-brand-white prose-li:text-brand-white/90"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>
    </main>
  );
}
