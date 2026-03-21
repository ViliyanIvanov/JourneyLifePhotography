'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useBlogPosts, type BlogPostSummaryDto } from '@/lib/api';

/* ------------------------------------------------------------------ */
/*  Featured Post — large editorial card                               */
/* ------------------------------------------------------------------ */

function FeaturedPost({ post }: { post: BlogPostSummaryDto }) {
  const tags =
    post.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean) || [];
  const coverImageUrl =
    post.featuredImage?.webUrl ||
    post.featuredImage?.thumbUrl ||
    '/placeholder-blog.jpg';

  return (
    <ScrollAnimation direction="left" delay={200}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-brand-white/[0.06] card-glow-hover transition-all duration-500 hover:-translate-y-1">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-[260px] lg:h-[380px] overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-black/60 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent lg:hidden" />
            </div>

            {/* Content */}
            <div className="relative p-6 lg:p-10 flex flex-col justify-center bg-brand-white/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-[0.15em] text-brand-accent/80 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {post.publishedAt && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-brand-white/20" />
                    <time
                      dateTime={post.publishedAt}
                      className="text-[11px] uppercase tracking-[0.1em] text-brand-white/30"
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </>
                )}
              </div>

              <h2 className="text-2xl lg:text-3xl font-serif text-brand-white font-light leading-tight mb-4">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-brand-white/45 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 text-brand-accent/70 text-sm group-hover:text-brand-accent transition-colors duration-300">
                <span>Read article</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <div className="h-0.5 w-0 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out mt-4" />
            </div>
          </div>
        </div>
      </Link>
    </ScrollAnimation>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog Card — compact editorial card                                 */
/* ------------------------------------------------------------------ */

function BlogCard({
  post,
  index,
}: {
  post: BlogPostSummaryDto;
  index: number;
}) {
  const tags =
    post.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean) || [];
  const coverImageUrl =
    post.featuredImage?.webUrl ||
    post.featuredImage?.thumbUrl ||
    '/placeholder-blog.jpg';

  return (
    <ScrollAnimation direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'} delay={index * 80}>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="relative overflow-hidden rounded-2xl border border-brand-white/[0.06] card-glow-hover transition-all duration-500 hover:-translate-y-1.5 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-[220px] overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />

            {/* Tags overlay on image */}
            {tags.length > 0 && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {tags.slice(0, 1).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.15em] text-brand-white/90 font-medium bg-brand-black/50 backdrop-blur-sm rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 lg:p-6 flex flex-col flex-1 bg-brand-white/[0.02]">
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="text-[11px] uppercase tracking-[0.1em] text-brand-white/25 mb-3 block"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            )}

            <h3 className="text-lg font-serif text-brand-white font-light leading-snug line-clamp-2 mb-3">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-brand-white/35 text-sm leading-relaxed line-clamp-2 flex-1">
                {post.excerpt}
              </p>
            )}

            <div className="h-0.5 w-0 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out mt-4" />
          </div>
        </div>
      </Link>
    </ScrollAnimation>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Blog Card — compact horizontal row                          */
/* ------------------------------------------------------------------ */

function MobileBlogCard({
  post,
  index,
}: {
  post: BlogPostSummaryDto;
  index: number;
}) {
  const tags =
    post.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean) || [];
  const coverImageUrl =
    post.featuredImage?.webUrl ||
    post.featuredImage?.thumbUrl ||
    '/placeholder-blog.jpg';

  return (
    <ScrollAnimation direction="up" delay={index * 80}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex items-center gap-4 p-2 rounded-xl border border-brand-white/[0.06] bg-brand-white/[0.03] transition-all duration-300 active:shadow-[0_0_24px_rgba(176,204,209,0.15)]">
          {/* Thumbnail */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base text-brand-white truncate">
              {post.title}
            </h3>
            {tags.length > 0 && (
              <p className="text-xs text-brand-accent/80 mt-0.5">
                {tags[0]}
              </p>
            )}
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="text-xs text-brand-white/30 mt-0.5 block"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            )}
          </div>
        </div>
      </Link>
    </ScrollAnimation>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured skeleton */}
      <div className="rounded-2xl border border-brand-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[260px] lg:h-[380px] bg-brand-white/[0.04] animate-pulse" />
          <div className="p-8 space-y-4 bg-brand-white/[0.02]">
            <div className="h-3 w-24 bg-brand-white/[0.06] rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-brand-white/[0.06] rounded animate-pulse" />
            <div className="h-4 w-full bg-brand-white/[0.04] rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-brand-white/[0.04] rounded animate-pulse" />
          </div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="hidden lg:grid grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-brand-white/[0.06] overflow-hidden"
          >
            <div className="h-[220px] bg-brand-white/[0.04] animate-pulse" />
            <div className="p-6 space-y-3 bg-brand-white/[0.02]">
              <div className="h-3 w-20 bg-brand-white/[0.06] rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-brand-white/[0.06] rounded animate-pulse" />
              <div className="h-4 w-full bg-brand-white/[0.04] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useBlogPosts({ page, pageSize: 12 });

  const atmosphereImage =
    '/IvaDimitrovPhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg';

  return (
    <>
      <AtmosphereBackground photoUrl={atmosphereImage} darkness={88} />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-12">
          <Container className="text-center">
            <SplitText
              text="Journal"
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-white"
              delay={120}
            />
            <ScrollAnimation direction="up" delay={200}>
              <p className="mt-4 text-brand-white/60 text-base md:text-lg max-w-xl mx-auto font-light">
                Stories, insights, and creative perspectives from behind the
                lens.
              </p>
            </ScrollAnimation>
            {/* Accent divider */}
            <ScrollAnimation direction="fade" delay={400}>
              <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>

        {/* Content */}
        <section className="pb-24 md:pb-32">
          <Container>
            {isLoading && <BlogSkeleton />}

            {error && (
              <div className="text-center py-16">
                <p className="text-brand-white/50 text-sm font-light">
                  Unable to load posts right now. Please try again later.
                </p>
              </div>
            )}

            {data && data.items.length === 0 && (
              <div className="text-center py-16">
                <p className="text-brand-white/40 font-light">
                  New stories coming soon. Stay tuned.
                </p>
              </div>
            )}

            {data && data.items.length > 0 && (
              <div className="space-y-10">
                {/* Featured post — first post gets large treatment */}
                <FeaturedPost post={data.items[0]} />

                {/* Remaining posts */}
                {data.items.length > 1 && (
                  <>
                    {/* Desktop: 3-col grid */}
                    <div className="hidden lg:grid grid-cols-3 gap-5">
                      {data.items.slice(1).map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                      ))}
                    </div>

                    {/* Mobile: compact list */}
                    <div className="flex flex-col gap-3 lg:hidden">
                      {data.items.slice(1).map((post, index) => (
                        <MobileBlogCard
                          key={post.id}
                          post={post}
                          index={index}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!data.hasPreviousPage}
                      className="text-brand-white/40 hover:text-brand-white disabled:opacity-20"
                    >
                      Previous
                    </Button>
                    <span className="text-brand-white/20 text-sm tabular-nums">
                      {data.page} / {data.totalPages}
                    </span>
                    <Button
                      variant="ghost"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={!data.hasNextPage}
                      className="text-brand-white/40 hover:text-brand-white disabled:opacity-20"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>
      </div>
    </>
  );
}
