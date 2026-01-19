import type { AlbumDto } from '@/lib/api';
import { AlbumCard } from './album-card';
import { Skeleton } from '@/components/ui/skeleton';

interface AlbumGridProps {
  albums: AlbumDto[];
  isLoading?: boolean;
}

export function AlbumGrid({ albums, isLoading }: AlbumGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-white/70">No albums found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album, index) => (
        <AlbumCard key={album.id} album={album} index={index} />
      ))}
    </div>
  );
}
