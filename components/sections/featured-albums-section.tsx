import { Album } from '@/content/mock-data';
import { AlbumGrid } from '@/components/gallery/album-grid';
import { SectionShell } from '@/components/ui/section-shell';
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
    <SectionShell background="black" className="min-h-[80vh] bg-brand-black">
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
    </SectionShell>
  );
}
