'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { PhotoGrid } from '@/components/gallery/photo-grid';
import Image from 'next/image';
import { Lock, Calendar, Camera } from 'lucide-react';
import {
  useAlbums,
  useUnlockAlbum,
  ApiClientError,
  type AlbumDto,
  type AlbumWithMediaDto,
  type MediaAssetDto,
} from '@/lib/api';

// Convert MediaAssetDto to Photo format for PhotoGrid
function mediaToPhotos(media: MediaAssetDto[]) {
  return media.map((m) => ({
    id: m.id,
    url: m.webUrl || m.originalUrl || m.thumbUrl,
    thumbnailUrl: m.thumbUrl,
    alt: m.altText || m.fileName,
    width: m.width,
    height: m.height,
  }));
}

function UnlockForm({
  onUnlock,
  isLoading,
  error,
}: {
  onUnlock: (password: string) => void;
  isLoading: boolean;
  error: string;
}) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onUnlock(password);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 bg-brand-black">
      <Container className="max-w-md">
        <Card className="border-2 border-brand-white/10 bg-brand-black">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-brand-white/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-brand-emerald" />
            </div>
            <CardTitle className="text-brand-white">Private Album</CardTitle>
            <CardDescription className="text-brand-white/70">
              This album is password protected. Please enter the password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-brand-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                  className="bg-brand-white/10 border-brand-white/30 text-brand-white placeholder:text-brand-white/50"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Unlocking...' : 'Unlock Album'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

function AlbumContent({ album }: { album: AlbumWithMediaDto }) {
  const router = useRouter();
  const photos = mediaToPhotos(album.media || []);
  const coverImageUrl =
    album.coverImage?.webUrl || album.coverImage?.thumbUrl || '/placeholder-album.jpg';

  return (
    <main className="bg-brand-black min-h-screen">
      {/* Album Header */}
      <section className="border-b border-brand-emerald/20 py-12 md:py-16">
        <Container>
          <Button
            variant="ghost"
            onClick={() => router.push('/private')}
            className="mb-8 text-brand-white/70 hover:text-brand-white"
          >
            ← Back to Private Albums
          </Button>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={coverImageUrl}
                alt={album.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 text-brand-white">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
                {album.title}
              </h1>
              {album.description && (
                <p className="text-lg text-brand-white/70">{album.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-brand-white/60">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>{album.media?.length || 0} photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Photo Grid */}
      <section className="py-12 md:py-16">
        <Container>
          {photos.length > 0 ? (
            <PhotoGrid photos={photos} hasMore={false} />
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-white/70">No photos in this album yet.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

export default function PrivateAlbumPage() {
  const params = useParams();
  const tokenOrSlug = params.tokenOrSlug as string;
  const [unlockedAlbum, setUnlockedAlbum] = useState<AlbumWithMediaDto | null>(null);
  const [unlockError, setUnlockError] = useState('');

  // First, try to find the album to see if it exists
  const { data: albums, isLoading: albumsLoading } = useAlbums();

  const unlockAlbum = useUnlockAlbum({
    onSuccess: (data) => {
      setUnlockedAlbum(data);
      setUnlockError('');
      // Store in sessionStorage to persist during session
      sessionStorage.setItem(`album_unlocked_${data.id}`, 'true');
    },
    onError: (error) => {
      if (error instanceof ApiClientError) {
        if (error.is('INVALID_CREDENTIALS') || error.is('FORBIDDEN')) {
          setUnlockError('Invalid password. Please try again.');
        } else if (error.is('NOT_FOUND')) {
          setUnlockError('Album not found. Please check your access link.');
        } else {
          setUnlockError(error.message);
        }
      } else {
        setUnlockError('Something went wrong. Please try again.');
      }
    },
  });

  // Check if the token is a direct access token (try to unlock without password)
  useEffect(() => {
    // If tokenOrSlug looks like a token (UUID format or long string), try token-based unlock
    const isLikelyToken = tokenOrSlug.length > 20 || tokenOrSlug.includes('-');
    
    if (isLikelyToken && !unlockedAlbum && !unlockAlbum.isPending) {
      // Find the album by slug or ID first
      const album = albums?.find(
        (a) => a.slug === tokenOrSlug || a.id === tokenOrSlug
      );

      if (album && album.isPrivate) {
        // Try to unlock with token
        unlockAlbum.mutate({
          albumId: album.id,
          request: { token: tokenOrSlug },
        });
      }
    }
  }, [albums, tokenOrSlug, unlockedAlbum]);

  // Find the album by slug or ID
  const album = albums?.find(
    (a) => a.slug === tokenOrSlug || a.id === tokenOrSlug
  );

  const handlePasswordUnlock = (password: string) => {
    if (!album) return;
    setUnlockError('');
    unlockAlbum.mutate({
      albumId: album.id,
      request: { password },
    });
  };

  // Loading state
  if (albumsLoading) {
    return (
      <main className="min-h-screen bg-brand-black py-16">
        <Container>
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-emerald border-t-transparent" />
          </div>
        </Container>
      </main>
    );
  }

  // Album unlocked - show content
  if (unlockedAlbum) {
    return <AlbumContent album={unlockedAlbum} />;
  }

  // Album not found
  if (!album) {
    return (
      <main className="min-h-screen flex items-center justify-center py-12 bg-brand-black">
        <Container className="max-w-md">
          <Card className="border-2 border-brand-white/10 bg-brand-black">
            <CardHeader className="text-center">
              <CardTitle className="text-brand-white">Album Not Found</CardTitle>
              <CardDescription className="text-brand-white/70">
                The album you&apos;re looking for doesn&apos;t exist or may have been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => window.location.href = '/private'}
                className="w-full"
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </Container>
      </main>
    );
  }

  // Album is public - redirect to portfolio
  if (!album.isPrivate) {
    return (
      <main className="min-h-screen flex items-center justify-center py-12 bg-brand-black">
        <Container className="max-w-md">
          <Card className="border-2 border-brand-white/10 bg-brand-black">
            <CardHeader className="text-center">
              <CardTitle className="text-brand-white">Public Album</CardTitle>
              <CardDescription className="text-brand-white/70">
                This album is publicly available in our portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => window.location.href = `/portfolio/${album.slug || album.id}`}
                className="w-full"
              >
                View in Portfolio
              </Button>
            </CardContent>
          </Card>
        </Container>
      </main>
    );
  }

  // Show unlock form for private album
  return (
    <UnlockForm
      onUnlock={handlePasswordUnlock}
      isLoading={unlockAlbum.isPending}
      error={unlockError}
    />
  );
}
