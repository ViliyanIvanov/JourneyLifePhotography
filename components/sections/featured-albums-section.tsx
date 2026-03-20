'use client';

import { AlbumCarousel, CarouselAlbum } from '@/components/carousel/album-carousel';
import { Container } from '@/components/layout/container';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Link from 'next/link';

interface FeaturedAlbumsSectionProps {
  albums: CarouselAlbum[];
}

export function FeaturedAlbumsSection({ albums }: FeaturedAlbumsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-brand-black py-24 md:py-40">
      {/* Atmospheric background — CSS gradients only, no GPU filter cost */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-brand-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(196,137,138,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Top edge — blends seamlessly with the section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-64 md:h-96 bg-gradient-to-b from-brand-black via-brand-black/90 via-50% to-transparent" />

      {/* Bottom edge — blends seamlessly with the section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 md:h-96 bg-gradient-to-t from-brand-black via-brand-black/90 via-50% to-transparent" />

      {/* Grain texture — static, reduced SVG complexity */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Ambient accent glow — radial gradient replaces blur-3xl */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(196,137,138,0.06)_0%,transparent_70%)]" />

      <Container className="relative z-[2]">
        <ScrollAnimation direction="fade">
          <div className="mb-16 max-w-4xl">
            <div className="mb-6 h-px w-16 origin-left animate-draw-line bg-brand-accent" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-6 leading-tight tracking-tight">
              <SplitText text="Featured Albums" delay={80} className="inline" />
            </h2>
            <Text size="lg" className="text-brand-white/70 leading-relaxed">
              Explore our latest work and see how we capture special moments with precision and emotion.
            </Text>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={100}>
          <div className="mb-20">
            <AlbumCarousel albums={albums} />
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={300} effect="float">
          <div className="flex justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/portfolio">View All Albums</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
