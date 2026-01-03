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
  title: 'Edit Blog Post',
  noindex: true,
});

export default function EditBlogPostPage() {
  return (
    <Container>
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/admin/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>Update blog post content</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue="10 Tips for Perfect Wedding Photography"
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                defaultValue="Learn essential techniques for capturing beautiful wedding moments that will last a lifetime."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                defaultValue="<h2>Introduction</h2><p>Wedding photography is an art...</p>"
                rows={12}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" defaultValue="Wedding, Photography Tips, Guide" />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">Save Changes</Button>
              <Button asChild variant="ghost" type="button">
                <Link href="/admin/blog">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

