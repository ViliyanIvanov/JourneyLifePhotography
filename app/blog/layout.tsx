import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Journal',
  description:
    'Photography stories, tips, and behind-the-scenes insights from Iva Dimitrov Photography.',
  path: '/blog',
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
