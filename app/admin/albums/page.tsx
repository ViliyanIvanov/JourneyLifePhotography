'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAdminAlbums, useDeleteAlbum, useAuth, type AdminAlbumDto } from '@/lib/api';

function AlbumCard({ album, onDelete }: { album: AdminAlbumDto; onDelete: (id: string) => void }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    setIsDeleting(true);
    onDelete(album.id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{album.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant={album.isPrivate ? 'secondary' : 'default'}>
                {album.isPrivate ? 'Private' : 'Public'}
              </Badge>
              <Badge variant={album.isPublished ? 'default' : 'secondary'}>
                {album.isPublished ? 'Published' : 'Draft'}
              </Badge>
              {album.hasPassword && (
                <Badge variant="secondary">Password Protected</Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {album.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {album.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-4">
          {album.mediaCount} photos
        </p>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/admin/albums/${album.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AlbumsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-2/3" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-24 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminAlbumsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useAdminAlbums(
    { page, pageSize: 20 },
    { enabled: isAuthenticated }
  );
  const deleteAlbum = useDeleteAlbum({
    onSuccess: () => refetch(),
  });

  const handleDelete = (albumId: string) => {
    deleteAlbum.mutate(albumId);
  };

  if (authLoading) {
    return (
      <Container>
        <AlbumsListSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Albums</h1>
          <p className="text-muted-foreground mt-2">
            Manage your photo albums
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/albums/new">
            <Plus className="mr-2 h-4 w-4" />
            New Album
          </Link>
        </Button>
      </div>

      {isLoading && <AlbumsListSkeleton />}

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
          <p className="font-medium">Failed to load albums</p>
          <p className="text-sm mt-1">{error.message}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {data && data.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No albums yet</p>
          <Button asChild>
            <Link href="/admin/albums/new">
              <Plus className="mr-2 h-4 w-4" />
              Create your first album
            </Link>
          </Button>
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((album) => (
              <AlbumCard key={album.id} album={album} onDelete={handleDelete} />
            ))}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!data.hasPreviousPage}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.hasNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
