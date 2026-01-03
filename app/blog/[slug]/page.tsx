import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { mockBlogPosts } from '@/content/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return createMetadata({ title: 'Post Not Found' });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main>
        <article className="py-12 md:py-16 bg-brand-black">
          <Container className="max-w-4xl">
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="bg-brand-emerald text-brand-white border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif text-brand-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-brand-white/60">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
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
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-white prose-p:text-brand-white/90 prose-a:text-brand-emerald prose-strong:text-brand-white prose-li:text-brand-white/90"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Container>
        </article>
      </main>
    </>
  );
}

