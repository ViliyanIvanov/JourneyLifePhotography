import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Create Album',
  noindex: true,
});

export default function NewAlbumPage() {
  return (
    <Container>
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/admin/albums">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Albums
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Album</CardTitle>
          <CardDescription>
            Add a new photo album to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Album title" required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Album description"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Weddings, Portraits" />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">Create Album</Button>
              <Button asChild variant="outline" type="button">
                <Link href="/admin/albums">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

