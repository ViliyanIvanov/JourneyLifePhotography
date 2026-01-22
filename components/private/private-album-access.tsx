'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PrivateAlbumAccess() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accessKey.trim()) {
      setError('Please enter an access key');
      return;
    }

    setIsLoading(true);

    try {
      // Navigate to the private album page with the token
      // The actual validation will happen on the album page
      router.push(`/private/${encodeURIComponent(accessKey.trim())}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="accessKey" className="text-brand-white mb-2 block">
          Access Key
        </Label>
        <Input
          id="accessKey"
          type="text"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
          placeholder="Enter your access key"
          required
          disabled={isLoading}
          className="bg-brand-white/10 border-brand-white/30 text-brand-white placeholder:text-brand-white/50"
        />
        <p className="text-brand-white/50 text-sm mt-2">
          Enter the access key or token you received to view your private album.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-brand-black/50 border border-brand-white/20 p-3 text-sm text-brand-white">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Verifying...' : 'Access Album'}
      </Button>
    </form>
  );
}
