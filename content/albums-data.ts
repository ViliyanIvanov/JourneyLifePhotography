// =====================
// Album Configuration
// Supports both local images (/IvaDimitrovPhotos/*) and S3 URLs for production
// =====================

export interface AlbumConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImagePath: string; // Path or S3 key, will be prefixed based on env
  coverObjectPosition?: string;
  imageCount: number;
  isPrivate: boolean;
  createdAt: string;
}

// Thumbnail URL — served from frontend /public/IvaDimitrovPhotos/
export function getImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/IvaDimitrovPhotos';
  return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
}

// Full-size image URL — served from backend (higher quality)
// Strips _thumb suffix and uses NEXT_PUBLIC_FULL_IMAGE_BASE_URL
export function getFullImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_FULL_IMAGE_BASE_URL || '/IvaDimitrovPhotos';
  const fullPath = path.replace(/_thumb\.jpg$/, '.jpg');
  return `${baseUrl}${fullPath.startsWith('/') ? fullPath : '/' + fullPath}`;
}

// Album definitions - use relative paths
// These will be converted to either local or S3 URLs based on NEXT_PUBLIC_IMAGE_BASE_URL
export const albumsData: AlbumConfig[] = [
  {
    id: 'wedding-1',
    slug: 'wedding-1',
    title: 'M&M Wedding',
    description: 'An elegant wedding ceremony and reception',
    category: 'Weddings',
    coverImagePath: '/acrossPages/portfolio_wedding_MM_doors.png',
    imageCount: 20,
    isPrivate: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'wedding-2',
    slug: 'wedding-2',
    title: 'N&V Wedding',
    description: 'A romantic wedding captured throughout the day',
    category: 'Weddings',
    coverImagePath: '/acrossPages/portfolio_wedding_NV_bw_bride.png',
    imageCount: 18,
    isPrivate: false,
    createdAt: '2024-01-15',
  },
  {
    id: 'wedding-3',
    slug: 'wedding-3',
    title: 'G&T Wedding',
    description: 'A beautiful wedding celebration captured in detail',
    category: 'Weddings',
    coverImagePath: '/acrossPages/portfolio_wedding_last_greenery.png',
    imageCount: 25,
    isPrivate: false,
    createdAt: '2024-02-01',
  },
  {
    id: 'engagement',
    slug: 'engagement',
    title: 'S&S Engagement Session',
    description: 'Pre-wedding engagement photo session',
    category: 'Weddings',
    coverImagePath: '/Weddings/Engagement/Album cover eng_thumb.jpg',
    imageCount: 15,
    isPrivate: false,
    createdAt: '2023-12-15',
  },
  {
    id: 'architecture-interiors',
    slug: 'architecture-interiors',
    title: 'Architecture & Interiors',
    description: 'Professional architectural and interior design photography',
    category: 'Architecture',
    coverImagePath: '/Architecture and Interiors small/DSC00293_thumb.jpg',
    imageCount: 24,
    isPrivate: false,
    createdAt: '2024-01-10',
  },
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding',
    description: 'Corporate branding and product photography',
    category: 'Branding',
    coverImagePath: '/acrossPages/portfolio_branding_graffiti_child.png',
    imageCount: 16,
    isPrivate: false,
    createdAt: '2024-01-20',
  },
  {
    id: 'children-family',
    slug: 'children-family',
    title: 'Children & Family',
    description: 'Heartwarming family and children photography',
    category: 'Family',
    coverImagePath: '/acrossPages/portfolio_family_baby_overhead.png',
    imageCount: 32,
    isPrivate: false,
    createdAt: '2024-02-05',
  },
  {
    id: 'corporate',
    slug: 'corporate',
    title: 'Corporate Events',
    description: 'Professional corporate event photography',
    category: 'Corporate',
    coverImagePath: '/Corporate small/Album cover_thumb.jpg',
    imageCount: 28,
    isPrivate: false,
    createdAt: '2024-01-25',
  },
  {
    id: 'travel-photography',
    slug: 'travel-photography',
    title: 'Travel Photography',
    description: 'Travel and adventure photography from around the world',
    category: 'Travel',
    coverImagePath: '/acrossPages/portfolio_travel_tunnel_child.png',
    imageCount: 40,
    isPrivate: false,
    createdAt: '2024-02-10',
  },
];

// Helper to get all albums with proper image URLs
export function getAllAlbums(): (AlbumConfig & { coverImage: string })[] {
  return albumsData.map(album => ({
    ...album,
    coverImage: getImageUrl(album.coverImagePath),
  }));
}
