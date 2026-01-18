import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_BASE_URL: z.string().default('http://localhost:5000/api'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Re-export for convenience
export const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
export const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
