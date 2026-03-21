import { env } from '../env';

/**
 * Server-side fetch helper for use in generateMetadata and server components.
 * Does NOT use TanStack Query — plain fetch with error handling.
 */
export async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
