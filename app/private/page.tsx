import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { NavAnchor } from '@/components/layout/nav-anchor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PrivateAlbumAccess } from '@/components/private/private-album-access';

export const metadata = createMetadata({
  title: 'Private Albums',
  description: 'Access your private photo albums with an access key.',
  noindex: true,
});

export default function PrivateAlbumsPage() {
  return (
    <>
      {/* Photo-led hero section */}
      <section className="relative min-h-[70vh] flex items-center text-brand-white">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/private-bg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-brand-black/75" />
        </div>

        <Container className="relative z-10 max-w-2xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 font-serif">
              Private Albums
            </h1>
            <p className="text-xl text-brand-white/90 leading-relaxed">
              Enter your access key to view your private photo albums
            </p>
          </div>

          {/* Password form - clean, minimal */}
          <div className="bg-brand-white/10 backdrop-blur-sm border border-brand-white/20 rounded-lg p-8">
            <PrivateAlbumAccess />
          </div>
        </Container>
        
        {/* Floating navbar anchor */}
        <NavAnchor desktopVh={90} mobileVh={82} />
      </section>
    </>
  );
}

