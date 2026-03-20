import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { createMetadata as seo } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlobalLoader } from '@/components/ui/global-loader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ScrollProgress = dynamic(
  () => import('@/components/ui/scroll-progress').then((m) => m.ScrollProgress),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = seo();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <Providers>
          <ScrollProgress />
          <Suspense fallback={null}>
            <GlobalLoader />
          </Suspense>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
