import { AlbumCarousel, CarouselAlbum } from '@/components/carousel/album-carousel';
import { SectionShell } from '@/components/ui/section-shell';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Link from 'next/link';

interface FeaturedAlbumsSectionProps {
  albums: CarouselAlbum[];
}

export function FeaturedAlbumsSection({ albums }: FeaturedAlbumsSectionProps) {
  const bgPhoto = albums[0]?.coverImage;

  return (
    <SectionShell
      background="warm-1"
      bgImage={bgPhoto}
      bgImageOpacity={82}
      blendEdges
      className="py-32 md:py-48"
    >
      {/* Ambient glow behind carousel */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[400px] rounded-full blur-3xl animate-breathe"
        style={{ backgroundColor: 'rgba(196, 137, 138, 0.06)' }}
      />

      <ScrollAnimation direction="fade">
        <div className="mb-16 max-w-4xl">
          {/* Decorative line — draw-line animation on scroll */}
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
    </SectionShell>
  );
}
