'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useBlogPosts, type BlogPostSummaryDto } from '@/lib/api';

function BlogPostCard({ post, index }: { post: BlogPostSummaryDto; index: number }) {
  const tags = post.tags?.split(',').map((t) => t.trim()).filter(Boolean) || [];
  const coverImageUrl = post.featuredImage?.webUrl || post.featuredImage?.thumbUrl || '/placeholder-blog.jpg';

  return (
    <ScrollAnimation direction="up" delay={index * 100}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full overflow-hidden transition-all duration-300 border-2 border-brand-white/10 hover:border-brand-white/20 bg-brand-black">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="text-xs bg-brand-white/10 text-brand-white border border-brand-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="line-clamp-2 font-serif text-brand-white group-hover:text-brand-white/90 transition-colors">
              {post.title}
            </CardTitle>
            {post.excerpt && (
              <CardDescription className="line-clamp-2 text-brand-white/70">
                {post.excerpt}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-brand-white/60">
              <Calendar className="h-4 w-4" />
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </ScrollAnimation>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="border-2 border-brand-white/10 bg-brand-black">
          <Skeleton className="aspect-video" />
          <CardHeader>
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useBlogPosts({ page, pageSize: 12 });

  return (
    <>
      <PageHeader
        title="Blog"
        description="Insights, inspiration, and expert guidance on photography. Discover techniques, stories behind the lens, and creative perspectives."
      />
      <main className="py-24 md:py-32 bg-black">
        <Container>
          {isLoading && <BlogListSkeleton />}

          {error && (
            <div className="text-center py-12">
              <p className="text-brand-white/70 mb-4">Unable to load blog posts</p>
              <p className="text-brand-white/50 text-sm">{error.message}</p>
            </div>
          )}

          {data && data.items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brand-white/70">No blog posts yet. Check back soon!</p>
            </div>
          )}

          {data && data.items.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <Button
                    variant="secondary"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!data.hasPreviousPage}
                  >
                    Previous
                  </Button>
                  <span className="text-brand-white/60">
                    Page {data.page} of {data.totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!data.hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  );
}
