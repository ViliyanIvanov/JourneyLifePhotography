'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCreateBlogPost, ApiClientError, type CreateBlogPostRequest } from '@/lib/api';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateBlogPostRequest>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    isPublished: false,
    metaTitle: '',
    metaDescription: '',
    tags: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createPost = useCreateBlogPost({
    onSuccess: (post) => {
      router.push(`/admin/blog/${post.id}/edit`);
    },
    onError: (error) => {
      if (error instanceof ApiClientError && error.is('VALIDATION_ERROR')) {
        const fieldErrors: Record<string, string> = {};
        error.getAllFieldErrors().forEach(({ field, messages }) => {
          fieldErrors[field.toLowerCase()] = messages[0];
        });
        setErrors(fieldErrors);
      }
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setErrors({});

    if (!formData.title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }
    if (!formData.content.trim()) {
      setErrors({ content: 'Content is required' });
      return;
    }

    const data: CreateBlogPostRequest = {
      ...formData,
      title: formData.title.trim(),
      slug: formData.slug?.trim() || undefined,
      excerpt: formData.excerpt?.trim() || undefined,
      content: formData.content.trim(),
      isPublished: publish,
      publishedAt: publish ? new Date().toISOString() : undefined,
      metaTitle: formData.metaTitle?.trim() || undefined,
      metaDescription: formData.metaDescription?.trim() || undefined,
      tags: formData.tags?.trim() || undefined,
    };

    createPost.mutate(data);
  };

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
          <CardTitle>Create New Blog Post</CardTitle>
          <CardDescription>Write and publish a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Blog post title"
                required
                disabled={createPost.isPending}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL-friendly name)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="blog-post-url-slug"
                disabled={createPost.isPending}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to auto-generate from title
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Short description of the post"
                rows={3}
                disabled={createPost.isPending}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive mt-1">{errors.excerpt}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog post content here..."
                rows={12}
                disabled={createPost.isPending}
              />
              {errors.content && (
                <p className="text-sm text-destructive mt-1">{errors.content}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Photography, Tips, Tutorial"
                disabled={createPost.isPending}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-3">SEO Settings (Optional)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    placeholder="SEO title (max 70 characters)"
                    maxLength={70}
                    disabled={createPost.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="SEO description (max 160 characters)"
                    maxLength={160}
                    rows={2}
                    disabled={createPost.isPending}
                  />
                </div>
              </div>
            </div>

            {createPost.error && !Object.keys(errors).length && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {createPost.error.message}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={createPost.isPending}
              >
                {createPost.isPending ? 'Publishing...' : 'Publish'}
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={createPost.isPending}
              >
                {createPost.isPending ? 'Saving...' : 'Save Draft'}
              </Button>
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
