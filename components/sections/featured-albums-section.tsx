import { Album } from '@/content/mock-data';
import { AlbumGrid } from '@/components/gallery/album-grid';
import { Container } from '@/components/layout/container';
import { Overlay } from '@/components/ui/overlay';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';

interface FeaturedAlbumsSectionProps {
  albums: Album[];
}

export function FeaturedAlbumsSection({ albums }: FeaturedAlbumsSectionProps) {
  return (
    <Overlay imageUrl="/portfolio-bg.jpg" gradient="heavy" className="min-h-[80vh] py-32 md:py-40">
      <Container>
        <ScrollAnimation direction="fade">
          <div className="mb-20 max-w-3xl">
            <Heading as="h2" size="3xl" className="mb-8">
              Featured Albums
            </Heading>
            <Text size="xl">
              Explore our latest work and see how we capture special moments
            </Text>
          </div>
        </ScrollAnimation>
        <AlbumGrid albums={albums} />
        <ScrollAnimation direction="fade" delay={200}>
          <div className="mt-20">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-brand-white text-brand-white hover:bg-brand-emerald hover:border-brand-emerald"
            >
              <Link href="/portfolio">View All Albums</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </Overlay>
  );
}

