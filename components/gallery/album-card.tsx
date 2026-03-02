import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { TiltCard } from '@/components/ui/tilt-card';
import type { AlbumDto } from '@/lib/api';
import type { Album } from '@/content/mock-data';
import { Lock } from 'lucide-react';

interface AlbumCardProps {
  album: AlbumDto | Album;
  index?: number;
}

export function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  const coverImageUrl = typeof album.coverImage === 'string'
    ? album.coverImage
    : (album.coverImage?.webUrl || album.coverImage?.thumbUrl || '/placeholder-album.jpg');

  return (
    <ScrollAnimation direction="up" delay={index * 100}>
      <TiltCard maxTilt={6}>
        <Link href={album.isPrivate ? `/private/${album.slug || album.id}` : `/portfolio/${album.slug || album.id}`}>
          <div className="group relative overflow-hidden bg-brand-black card-glow-hover rounded-lg">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-colors duration-500" />

              {album.isPrivate && (
                <div className="absolute top-4 right-4 bg-brand-black/70 backdrop-blur-sm rounded-full p-2">
                  <Lock className="h-4 w-4 text-brand-white" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent">
                <h3 className="text-xl sm:text-2xl font-light text-brand-white font-serif mb-1 transition-colors duration-300">
                  {album.title}
                </h3>
                <div className="h-0.5 w-0 bg-brand-white group-hover:w-full transition-all duration-500 ease-out mt-2" />
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </ScrollAnimation>
  );
}
