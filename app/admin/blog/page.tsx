'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAdminBlogPosts, useDeleteBlogPost, useAuth, type AdminBlogPostDto } from '@/lib/api';

function BlogPostCard({
  post,
  onDelete,
}: {
  post: AdminBlogPostDto;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setIsDeleting(true);
    onDelete(post.id);
  };

  const tags = post.tags?.split(',').map((t) => t.trim()).filter(Boolean) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                {post.isPublished ? 'Published' : 'Draft'}
              </Badge>
              {post.publishedAt && (
                <span className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/admin/blog/${post.id}/edit`}>
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

function BlogListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-2/3" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
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

export default function AdminBlogPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useAdminBlogPosts(
    { page, pageSize: 20 },
    { enabled: isAuthenticated }
  );
  const deletePost = useDeleteBlogPost({
    onSuccess: () => refetch(),
  });

  const handleDelete = (postId: string) => {
    deletePost.mutate(postId);
  };

  if (authLoading) {
    return (
      <Container>
        <BlogListSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your blog content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {isLoading && <BlogListSkeleton />}

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
          <p className="font-medium">Failed to load blog posts</p>
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
          <p className="text-muted-foreground mb-4">No blog posts yet</p>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              Write your first post
            </Link>
          </Button>
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="space-y-4">
            {data.items.map((post) => (
              <BlogPostCard key={post.id} post={post} onDelete={handleDelete} />
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
