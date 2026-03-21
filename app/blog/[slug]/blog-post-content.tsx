'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useBlogPost } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface PageProps {
  params: { slug: string };
}

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

function PostSkeleton() {
  return (
    <>
      <AtmosphereBackground
        photoUrl="/IvaDimitrovPhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg"
        darkness={88}
      />
      <div className="relative z-10 min-h-screen">
        <section className="pt-32 md:pt-40 pb-12">
          <Container className="max-w-3xl">
            <div className="h-3 w-32 bg-brand-white/[0.06] rounded animate-pulse mb-8" />
            <div className="h-10 w-3/4 bg-brand-white/[0.06] rounded animate-pulse mb-4" />
            <div className="h-10 w-1/2 bg-brand-white/[0.06] rounded animate-pulse mb-6" />
            <div className="h-3 w-48 bg-brand-white/[0.04] rounded animate-pulse" />
          </Container>
        </section>
        <section className="pb-24">
          <Container className="max-w-3xl">
            <div className="aspect-[21/9] rounded-2xl bg-brand-white/[0.04] animate-pulse mb-12" />
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-brand-white/[0.04] rounded animate-pulse"
                  style={{ width: `${75 + Math.random() * 25}%` }}
                />
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPostContent({ params }: PageProps) {
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
      <>
        <AtmosphereBackground
          photoUrl="/IvaDimitrovPhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg"
          darkness={88}
        />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Container>
            <div className="text-center">
              <p className="text-brand-white/50 text-sm font-light">
                Unable to load this article right now.
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (!post) {
    notFound();
  }

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
    <>
      <AtmosphereBackground photoUrl={coverImageUrl} darkness={85} />

      <article className="relative z-10 min-h-screen">
        {/* Article header */}
        <section className="pt-28 md:pt-36 pb-8 md:pb-12">
          <Container className="max-w-3xl">
            <ScrollAnimation direction="fade" delay={0}>
              <Breadcrumbs
                items={[
                  { name: 'Home', href: '/' },
                  { name: 'Journal', href: '/blog' },
                  { name: post.title, href: `/blog/${slug}` },
                ]}
              />
            </ScrollAnimation>

            {/* Meta */}
            <ScrollAnimation direction="up" delay={100}>
              <div className="flex items-center gap-3 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-[0.15em] text-brand-accent/80 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 0 && post.publishedAt && (
                  <span className="w-1 h-1 rounded-full bg-brand-white/20" />
                )}
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-[11px] uppercase tracking-[0.1em] text-brand-white/30"
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </ScrollAnimation>

            {/* Title */}
            <h1 className="font-serif text-brand-white font-light leading-[1.1] tracking-tight mb-8">
              <SplitText
                text={post.title}
                delay={200}
                stagger={50}
                className="text-[clamp(2rem,5vw,3.5rem)]"
              />
            </h1>

            {/* Accent divider */}
            <ScrollAnimation direction="fade" delay={500}>
              <div className="h-px w-16 bg-gradient-to-r from-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>

        {/* Cover image */}
        {post.featuredImage && (
          <section className="pb-10 md:pb-14">
            <Container className="max-w-4xl">
              <ScrollAnimation direction="up" delay={300}>
                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-brand-white/[0.06]">
                  <Image
                    src={coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(10,10,10,0.4)]" />
                </div>
              </ScrollAnimation>
            </Container>
          </section>
        )}

        {/* Article content */}
        <section className="pb-24 md:pb-32">
          <Container className="max-w-3xl">
            <ScrollAnimation direction="up" delay={400}>
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-brand-white prose-headings:font-light prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-brand-white/70 prose-p:leading-[1.8] prose-p:font-light
                  prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-brand-white prose-strong:font-medium
                  prose-li:text-brand-white/70
                  prose-blockquote:border-brand-accent/30 prose-blockquote:text-brand-white/50 prose-blockquote:font-serif prose-blockquote:italic
                  prose-img:rounded-xl prose-img:border prose-img:border-brand-white/[0.06]
                  prose-hr:border-brand-white/[0.06]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </ScrollAnimation>

            {/* Bottom divider + back link */}
            <ScrollAnimation direction="fade" delay={100}>
              <div className="mt-16 pt-8 border-t border-brand-white/[0.06]">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand-white/30 hover:text-brand-accent transition-colors duration-300 text-[13px] group/back"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/back:-translate-x-1" />
                  Back to Journal
                </Link>
              </div>
            </ScrollAnimation>
          </Container>
        </section>
      </article>
    </>
  );
}
