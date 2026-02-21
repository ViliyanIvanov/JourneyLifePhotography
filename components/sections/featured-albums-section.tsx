import { AlbumCarousel, CarouselAlbum } from '@/components/carousel/album-carousel';
import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';

interface FeaturedAlbumsSectionProps {
  albums: CarouselAlbum[];
}

export function FeaturedAlbumsSection({ albums }: FeaturedAlbumsSectionProps) {
  // Use the first album cover as blurred background for warmth
  const bgPhoto = albums[0]?.coverImage;

  return (
    <SectionShell
      background="black"
      bgImage={bgPhoto}
      bgImageOpacity={82}
      blendEdges
      className="py-32 md:py-48"
    >
      <ScrollAnimation direction="fade">
        <div className="mb-16 max-w-4xl">
          {/* Decorative line */}
          <div className="mb-6 h-px w-12 origin-left animate-line-grow bg-brand-accent" />
          <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
            Featured Albums
          </Heading>
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

      <ScrollAnimation direction="up" delay={300}>
        <div className="flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/portfolio">View All Albums</Link>
          </Button>
        </div>
      </ScrollAnimation>
    </SectionShell>
  );
}
