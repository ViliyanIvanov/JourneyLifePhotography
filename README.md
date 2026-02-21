# Iva Dimitrov Photography - Frontend

A Next.js + TypeScript frontend for a professional photography portfolio website.

## Features

- **Modern Stack**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Performance**: Optimized images, lazy loading, code splitting
- **SEO**: Built-in metadata, sitemap generation, structured data ready
- **Gallery**: Photo galleries with lightbox, pagination, and private album support
- **Admin Panel**: Complete admin interface for managing albums and blog posts
- **Forms**: Contact form with validation and spam protection

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel routes
│   ├── blog/              # Blog pages
│   ├── portfolio/         # Portfolio/gallery pages
│   ├── private/           # Private album access
│   └── ...                # Other public pages
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── forms/             # Form components
│   ├── gallery/           # Gallery components
│   ├── layout/            # Layout components
│   ├── private/           # Private album components
│   └── ui/                # shadcn/ui components
├── content/               # Mock data and content
├── lib/                   # Utilities and helpers
│   ├── api.ts             # API client
│   ├── env.ts             # Environment validation
│   ├── seo.ts             # SEO helpers
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Available Routes

### Public Routes
- `/` - Home page
- `/portfolio` - Album listing
- `/portfolio/[albumSlug]` - Individual album view
- `/services` - Services page
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post view
- `/about` - About page
- `/contact` - Contact form
- `/private` - Private album access

### Admin Routes
- `/admin/login` - Admin login
- `/admin` - Dashboard
- `/admin/albums` - Album management
- `/admin/blog` - Blog management
- `/admin/settings` - Settings

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: react-hook-form + zod
- **Data Fetching**: TanStack Query (ready for API integration)
- **Lightbox**: yet-another-react-lightbox
- **Icons**: lucide-react
- **SEO**: next-sitemap

## Performance Optimizations

- Server Components by default (minimal client-side JS)
- Image optimization with next/image
- Dynamic imports for heavy components (lightbox)
- Lazy loading with intersection observer
- Proper caching headers
- Code splitting


## License

Private - All rights reserved

