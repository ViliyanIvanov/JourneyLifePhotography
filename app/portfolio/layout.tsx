import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Portfolio',
  description:
    'Explore our photography portfolio — weddings, families, corporate events, and more.',
  path: '/portfolio',
});

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
