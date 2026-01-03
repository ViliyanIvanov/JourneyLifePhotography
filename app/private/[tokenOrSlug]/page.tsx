'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhotoGrid } from '@/components/gallery/photo-grid';
import { getMockPhotos } from '@/content/mock-data';
import { Lock } from 'lucide-react';

export default function PrivateAlbumPage() {
  const params = useParams();
  const router = useRouter();
  const tokenOrSlug = params.tokenOrSlug as string;
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // In a real app, this would check if the token is valid and if password is needed
  // For now, we'll simulate a password-protected album
  useEffect(() => {
    // Check if already unlocked (in memory only, no localStorage)
    // This is a placeholder - in production, this would check with the backend
    const unlocked = sessionStorage.getItem(`album_${tokenOrSlug}`);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, [tokenOrSlug]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock API call - replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo, accept any password
      // In production, validate with backend
      if (password.trim()) {
        setIsUnlocked(true);
        // Store in sessionStorage (memory only, cleared on tab close)
        sessionStorage.setItem(`album_${tokenOrSlug}`, 'true');
      } else {
        setError('Please enter a password');
      }
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUnlocked) {
    return (
      <>
        <main className="min-h-screen flex items-center justify-center py-12">
          <Container className="max-w-md">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle>Private Album</CardTitle>
                <CardDescription>
                  This album is password protected. Please enter the password to
                  continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      disabled={isLoading}
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
      </>
    );
  }

  // Show album content after unlock
  const photos = getMockPhotos(tokenOrSlug, 40);

  return (
    <>
      <main>
        <section className="border-b bg-muted/50 py-12 md:py-16">
          <Container>
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/private')}
                className="mb-4"
              >
                ← Back to Private Albums
              </Button>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Private Album
            </h1>
            <p className="text-lg text-muted-foreground">
              Your private photo collection
            </p>
          </Container>
        </section>

        <section className="py-12 md:py-16">
          <Container>
            <PhotoGrid photos={photos} hasMore={false} />
          </Container>
        </section>
      </main>
    </>
  );
}

