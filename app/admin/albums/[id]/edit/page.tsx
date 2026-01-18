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
import { ArrowLeft, Upload, Trash2, GripVertical } from 'lucide-react';
import {
  useAdminAlbum,
  useUpdateAlbum,
  useDeleteAlbum,
  useUploadAlbumMedia,
  useDeleteAlbumMedia,
  ApiClientError,
  type UpdateAlbumRequest,
} from '@/lib/api';

function LoadingSkeleton() {
  return (
    <Container>
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function EditAlbumPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const { data: album, isLoading, error: fetchError, refetch } = useAdminAlbum(albumId);
  const [formData, setFormData] = useState<UpdateAlbumRequest>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(false);

  const updateAlbum = useUpdateAlbum({
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

  const deleteAlbum = useDeleteAlbum({
    onSuccess: () => router.push('/admin/albums'),
  });

  const uploadMedia = useUploadAlbumMedia({
    onSuccess: () => {
      refetch();
      setUploadProgress(false);
    },
    onError: () => setUploadProgress(false),
  });

  const deleteMedia = useDeleteAlbumMedia();

  // Initialize form data when album loads
  useEffect(() => {
    if (album) {
      setFormData({
        title: album.title,
        description: album.description || '',
        slug: album.slug || '',
        isPrivate: album.isPrivate,
        isPublished: album.isPublished,
        clientName: album.clientName || '',
        clientEmail: album.clientEmail || '',
        sortOrder: album.sortOrder,
      });
    }
  }, [album]);

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

    updateAlbum.mutate({
      albumId,
      request: {
        ...formData,
        title: formData.title?.trim(),
        description: formData.description?.trim() || undefined,
        slug: formData.slug?.trim() || undefined,
        clientName: formData.clientName?.trim() || undefined,
        clientEmail: formData.clientEmail?.trim() || undefined,
      },
    });
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
      return;
    }
    deleteAlbum.mutate(albumId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploadProgress(true);
    uploadMedia.mutate({
      albumId,
      files: Array.from(files),
    });

    // Reset input
    e.target.value = '';
  };

  const handleDeleteMedia = (mediaId: string) => {
    if (!confirm('Delete this photo?')) return;
    deleteMedia.mutate({ albumId, mediaId });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (fetchError) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Failed to load album</p>
          <p className="text-muted-foreground mb-4">{fetchError.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </Container>
    );
  }

  if (!album) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Album not found</p>
          <Button asChild>
            <Link href="/admin/albums">Back to Albums</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8 flex items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/admin/albums">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Albums
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteAlbum.isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {deleteAlbum.isPending ? 'Deleting...' : 'Delete Album'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Album Details Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Album</CardTitle>
            <CardDescription>Update album details</CardDescription>
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
                  disabled={updateAlbum.isPending}
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
                  disabled={updateAlbum.isPending}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  disabled={updateAlbum.isPending}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={formData.isPrivate || false}
                    onChange={handleChange}
                    disabled={updateAlbum.isPending}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isPrivate" className="font-normal">
                    Private
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished || false}
                    onChange={handleChange}
                    disabled={updateAlbum.isPending}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isPublished" className="font-normal">
                    Published
                  </Label>
                </div>
              </div>

              {formData.isPrivate && (
                <div>
                  <Label htmlFor="password">New Password (leave empty to keep current)</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    disabled={updateAlbum.isPending}
                  />
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Client Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Name</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      value={formData.clientName || ''}
                      onChange={handleChange}
                      disabled={updateAlbum.isPending}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      name="clientEmail"
                      type="email"
                      value={formData.clientEmail || ''}
                      onChange={handleChange}
                      disabled={updateAlbum.isPending}
                    />
                  </div>
                </div>
              </div>

              {updateAlbum.error && !Object.keys(errors).length && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {updateAlbum.error.message}
                </div>
              )}

              {updateAlbum.isSuccess && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-600">
                  Album updated successfully!
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={updateAlbum.isPending}>
                  {updateAlbum.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button asChild variant="secondary" type="button">
                  <Link href="/admin/albums">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Media Upload & Management */}
        <Card>
          <CardHeader>
            <CardTitle>Photos ({album.mediaCount})</CardTitle>
            <CardDescription>Upload and manage album photos</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Upload Area */}
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Drag and drop photos here, or click to select
              </p>
              <input
                type="file"
                id="mediaUpload"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploadProgress}
              />
              <Button asChild variant="secondary" disabled={uploadProgress}>
                <label htmlFor="mediaUpload" className="cursor-pointer">
                  {uploadProgress ? 'Uploading...' : 'Select Photos'}
                </label>
              </Button>
            </div>

            {/* Media Grid - placeholder since we don't have media in the detail response */}
            <p className="text-sm text-muted-foreground text-center">
              {album.mediaCount > 0
                ? `This album contains ${album.mediaCount} photos. Use the upload area above to add more.`
                : 'No photos yet. Upload some photos to get started.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
