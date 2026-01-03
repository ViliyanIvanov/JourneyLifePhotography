import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Album } from '@/content/mock-data';
import { Camera } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  index?: number;
}

export function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  return (
    <ScrollAnimation direction="up" delay={index * 100}>
      <Link href={`/portfolio/${album.slug}`}>
        <div className="group relative overflow-hidden bg-brand-black">
          {/* Big album cover - cinematic aspect ratio */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
            <Image
              src={album.coverImage}
              alt={album.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-colors duration-500" />
            
            {/* Minimal title overlay - bottom positioned */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent">
              <h3 className="text-xl sm:text-2xl font-light text-brand-white font-serif mb-1 group-hover:text-brand-emerald transition-colors duration-300">
                {album.title}
              </h3>
              {/* Emerald underline animation */}
              <div className="h-0.5 w-0 bg-brand-emerald group-hover:w-full transition-all duration-500 ease-out mt-2" />
            </div>
          </div>
        </div>
      </Link>
    </ScrollAnimation>
  );
}

