# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Iva Dimitrov Photography is a professional photography portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. The site features photo galleries, blog functionality, an admin panel, and private album access with password protection.

## Development Commands

```bash
# Development
npm run dev              # Start Next.js development server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting without writing

# Album Management
npm run generate:albums  # Generate albums-data-full.ts from /public/JourneyLifePhotos folder structure
```

## Architecture

### Dual-Source Image Strategy

The app uses a **dual-source architecture** for image optimization:

1. **Thumbnails** (7.9 MB total)
   - Located in `/public/JourneyLifePhotos/*_thumb.jpg`
   - Served directly from the frontend
   - Used for: Grid views, album covers, initial page loads
   - Always use thumbnails for gallery grids and listings

2. **Full-size Images** (273 MB total)
   - Served from backend API or CDN
   - URL configured via `NEXT_PUBLIC_FULL_IMAGE_BASE_URL` env variable
   - Used for: Lightbox/modal views only (loaded on-demand)
   - Backend expected to serve from `/static/photos/<album>/<photo>.jpg`

**Image path pattern:**
- Thumbnails: `/JourneyLifePhotos/<album>/<photo>_thumb.jpg`
- Full images: `${NEXT_PUBLIC_FULL_IMAGE_BASE_URL}/<album>/<photo>.jpg`

This architecture keeps the frontend bundle small while providing high-quality images on demand.

### API Layer Architecture

Located in `/lib/api/`, the API layer follows this structure:

- **client.ts**: Core API client with authentication, error handling, and type-safe request methods
- **types.ts**: TypeScript interfaces for all API requests/responses (albums, blog, auth, contact)
- **hooks.ts**: TanStack Query (React Query) hooks for data fetching with caching and mutations
- **auth.ts & auth-context.tsx**: Authentication logic and React context for admin features
- **index.ts**: Public exports

**Pattern for API calls:**
1. Define types in `types.ts`
2. Add client method in `client.ts`
3. Create TanStack Query hook in `hooks.ts`
4. Use hook in components

Example:
```typescript
// In component
const { data: albums } = useAlbums({ category: 'weddings' });
```

### Album Data Generation

Albums are generated from the filesystem using `scripts/generate-albums-data.js`:

1. Scans `/public/JourneyLifePhotos/` directory structure
2. Reads album metadata from hardcoded `albumMetadata` object in the script
3. Generates `content/albums-data-full.ts` with all photos
4. Also maintains `content/albums-data.ts` for production (limited selection)

**To add new albums:**
1. Add photos to `/public/JourneyLifePhotos/<AlbumName>/`
2. Update `albumMetadata` in `scripts/generate-albums-data.js`
3. Run `npm run generate:albums`

### Route Organization

- `/app` - Next.js App Router pages (Server Components by default)
  - `/portfolio/[albumSlug]` - Dynamic album routes
  - `/admin/*` - Protected admin routes (client-side auth check)
  - `/private` - Private album access with password
  - `/blog/[slug]` - Dynamic blog routes
- `/components` - Organized by domain (admin, forms, gallery, layout, sections, ui)
- `/lib` - Utilities and shared logic

### UI Component System

- **shadcn/ui components**: `/components/ui/` (Radix UI primitives)
- **Custom components**: Domain-specific (gallery, admin, forms, layout, sections)
- **Design system**: Black (#0A0A0A), White (#FFFFFF), Accent Dusty Rose (#C4898A) - see `tailwind.config.ts`
- **Animations**: Custom scroll animations via `scroll-animation.tsx` and `split-text.tsx`

### Form Handling

Forms use **react-hook-form + Zod** for validation:
- Schema defined with Zod
- Form state managed by react-hook-form
- Integration via `@hookform/resolvers/zod`

Example: `/components/forms/contact-form.tsx`

### Data Loading Pattern

The app is **ready for API integration** but currently uses **mock data** from `/content/`:
- `albums-data.ts` - Production album data (curated selection)
- `albums-data-full.ts` - Complete album data (generated from filesystem)
- `mock-data.ts` - Mock blog posts and other content

**Switching to real API:**
1. Set `NEXT_PUBLIC_API_BASE_URL` in `.env`
2. API hooks in `lib/api/hooks.ts` are ready to use
3. Remove mock data imports and use hooks instead

## Frontend Design

When building or modifying web components, pages, or UI features, use the frontend-design skill to create distinctive, production-grade interfaces that align with the Iva Dimitrov Photography design system (Black #0A0A0A, White #FFFFFF, Emerald #2B5CFF, custom animations). The skill generates creative, polished code that avoids generic AI aesthetics and respects the existing component structure in `/components/`.

## Environment Variables

Required variables (see `.env.example`):

```bash
# Full-size image source (backend or CDN)
NEXT_PUBLIC_FULL_IMAGE_BASE_URL=http://localhost:5000/static/photos

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Key Files

- `next.config.js` - Image optimization, security headers, caching strategy
- `lib/api/client.ts` - API client with auth token handling
- `lib/seo.ts` - SEO metadata helpers
- `app/layout.tsx` - Root layout with providers
- `app/providers.tsx` - TanStack Query provider setup

## Performance Considerations

- Server Components by default (minimal client JS)
- Dynamic imports for heavy components (lightbox loaded on-demand)
- Lazy loading via Intersection Observer (`react-intersection-observer`)
- Image optimization via next/image with custom device sizes
- Aggressive caching for static assets (immutable, 1 year in production)
- Thumbnails strategy prevents loading hundreds of MB upfront
