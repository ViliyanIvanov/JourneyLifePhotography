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
    setIsLoading(true);

    try {
      // Mock validation - replace with actual API call later
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For now, just redirect to a placeholder album
      // In production, this would validate the key and redirect to the correct album
      if (accessKey.trim()) {
        router.push(`/private/${encodeURIComponent(accessKey.trim())}`);
      } else {
        setError('Please enter an access key');
      }
    } catch (err) {
      setError('Invalid access key. Please try again.');
    } finally {
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
          className="bg-brand-white/10 border-brand-white/30 text-brand-white placeholder:text-brand-white/50 focus:border-brand-emerald focus:ring-brand-emerald"
        />
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

