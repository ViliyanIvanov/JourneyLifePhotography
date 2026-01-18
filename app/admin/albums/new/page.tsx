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
import { useCreateAlbum, ApiClientError, type CreateAlbumRequest } from '@/lib/api';

export default function NewAlbumPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateAlbumRequest>({
    title: '',
    description: '',
    slug: '',
    isPrivate: false,
    password: '',
    sortOrder: 0,
    isPublished: false,
    clientName: '',
    clientEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createAlbum = useCreateAlbum({
    onSuccess: (album) => {
      router.push(`/admin/albums/${album.id}/edit`);
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
    // Clear error when field is edited
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

    // Basic client-side validation
    if (!formData.title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    // Prepare the data
    const data: CreateAlbumRequest = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      slug: formData.slug?.trim() || undefined,
      password: formData.isPrivate && formData.password ? formData.password : undefined,
      clientName: formData.clientName?.trim() || undefined,
      clientEmail: formData.clientEmail?.trim() || undefined,
    };

    createAlbum.mutate(data);
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Album title"
                required
                disabled={createAlbum.isPending}
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
                placeholder="album-url-slug"
                disabled={createAlbum.isPending}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to auto-generate from title
              </p>
              {errors.slug && (
                <p className="text-sm text-destructive mt-1">{errors.slug}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Album description"
                rows={4}
                disabled={createAlbum.isPending}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  disabled={createAlbum.isPending}
                  className="h-4 w-4"
                />
                <Label htmlFor="isPrivate" className="font-normal">
                  Private album
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  disabled={createAlbum.isPending}
                  className="h-4 w-4"
                />
                <Label htmlFor="isPublished" className="font-normal">
                  Publish immediately
                </Label>
              </div>
            </div>

            {formData.isPrivate && (
              <div>
                <Label htmlFor="password">Album Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password for private album"
                  disabled={createAlbum.isPending}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 6 characters
                </p>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-3">Client Information (Optional)</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Client name"
                    disabled={createAlbum.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="client@example.com"
                    disabled={createAlbum.isPending}
                  />
                  {errors.clientemail && (
                    <p className="text-sm text-destructive mt-1">{errors.clientemail}</p>
                  )}
                </div>
              </div>
            </div>

            {createAlbum.error && !Object.keys(errors).length && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {createAlbum.error.message}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={createAlbum.isPending}>
                {createAlbum.isPending ? 'Creating...' : 'Create Album'}
              </Button>
              <Button asChild variant="secondary" type="button">
                <Link href="/admin/albums">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
