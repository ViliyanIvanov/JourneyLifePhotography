import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAlbums } from '@/content/mock-data';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Manage Albums',
  noindex: true,
});

export default function AdminAlbumsPage() {
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockAlbums.map((album) => (
          <Card key={album.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{album.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={album.isPrivate ? 'secondary' : 'default'}>
                      {album.isPrivate ? 'Private' : 'Public'}
                    </Badge>
                    <Badge variant="outline">{album.category}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {album.description}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {album.imageCount} photos
              </p>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/albums/${album.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

