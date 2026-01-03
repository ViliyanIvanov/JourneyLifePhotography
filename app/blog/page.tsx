import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { mockBlogPosts } from '@/content/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Blog',
  description:
    'Photography tips, tutorials, and insights from our professional photography team.',
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Photography tips, tutorials, and insights"
      />
      <main className="py-12 md:py-16 bg-brand-black">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockBlogPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={index * 100}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden transition-all duration-300 border-2 border-brand-white/10 hover:border-brand-emerald/30 bg-brand-black">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} className="text-xs bg-brand-emerald text-brand-white border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2 font-serif text-brand-white group-hover:text-brand-emerald transition-colors">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-brand-white/70">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-brand-white/60">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}

