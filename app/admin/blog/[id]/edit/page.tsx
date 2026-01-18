'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import {
  useAdminBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  ApiClientError,
  type UpdateBlogPostRequest,
} from '@/lib/api';

function LoadingSkeleton() {
  return (
    <Container>
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>
      <Card className="max-w-4xl">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const { data: post, isLoading, error: fetchError, refetch } = useAdminBlogPost(postId);
  const [formData, setFormData] = useState<UpdateBlogPostRequest>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updatePost = useUpdateBlogPost({
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

  const deletePost = useDeleteBlogPost({
    onSuccess: () => router.push('/admin/blog'),
  });

  // Initialize form data when post loads
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        isPublished: post.isPublished,
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        tags: post.tags || '',
      });
    }
  }, [post]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.title?.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }
    if (!formData.content?.trim()) {
      setErrors({ content: 'Content is required' });
      return;
    }

    updatePost.mutate({
      postId,
      request: {
        ...formData,
        title: formData.title?.trim(),
        slug: formData.slug?.trim() || undefined,
        excerpt: formData.excerpt?.trim() || undefined,
        content: formData.content?.trim(),
        metaTitle: formData.metaTitle?.trim() || undefined,
        metaDescription: formData.metaDescription?.trim() || undefined,
        tags: formData.tags?.trim() || undefined,
      },
    });
  };

  const handlePublish = () => {
    updatePost.mutate({
      postId,
      request: {
        ...formData,
        isPublished: true,
        publishedAt: post?.publishedAt || new Date().toISOString(),
      },
    });
  };

  const handleUnpublish = () => {
    updatePost.mutate({
      postId,
      request: {
        isPublished: false,
      },
    });
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    deletePost.mutate(postId);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (fetchError) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Failed to load blog post</p>
          <p className="text-muted-foreground mb-4">{fetchError.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Blog post not found</p>
          <Button asChild>
            <Link href="/admin/blog">Back to Blog</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8 flex items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/admin/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {post.isPublished ? (
            <Button
              variant="secondary"
              onClick={handleUnpublish}
              disabled={updatePost.isPending}
            >
              Unpublish
            </Button>
          ) : (
            <Button
              onClick={handlePublish}
              disabled={updatePost.isPending}
            >
              Publish Now
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deletePost.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {deletePost.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>
            {post.isPublished
              ? `Published on ${new Date(post.publishedAt!).toLocaleDateString()}`
              : 'Draft'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
                disabled={updatePost.isPending}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug || ''}
                onChange={handleChange}
                disabled={updatePost.isPending}
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                rows={3}
                disabled={updatePost.isPending}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                rows={12}
                disabled={updatePost.isPending}
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
                value={formData.tags || ''}
                onChange={handleChange}
                disabled={updatePost.isPending}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle || ''}
                    onChange={handleChange}
                    maxLength={70}
                    disabled={updatePost.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription || ''}
                    onChange={handleChange}
                    maxLength={160}
                    rows={2}
                    disabled={updatePost.isPending}
                  />
                </div>
              </div>
            </div>

            {updatePost.error && !Object.keys(errors).length && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {updatePost.error.message}
              </div>
            )}

            {updatePost.isSuccess && (
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-600">
                Post updated successfully!
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={updatePost.isPending}>
                {updatePost.isPending ? 'Saving...' : 'Save Changes'}
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
