import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Private Albums',
  description: 'Access your private photo albums with an access key.',
  noindex: true,
  nofollow: true,
});

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
