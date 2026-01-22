// =====================
// Types
// =====================

export interface Album {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  imageCount: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
}

// =====================
// Demo-safe Unsplash helpers
// =====================

const DEMO_PHOTO_FILE_IDS = [
  "1677559027857-a3c27c877f54",
  "1766104803277-c668f35db818",
  "1540575467063-178a50c2df87",
  "1702047063975-0841a0621b5a",
  "1758518729706-b1810dd39cc6",
  "1492257288915-7dbeda091ebe",
  "1743506444917-38047eabb60a",
  "1747602543496-6634d599f8fb",
] as const;

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// =====================
// Mock Albums
// =====================

export const mockAlbums: Album[] = [
  {
    id: "1",
    slug: "wedding-sunset",
    title: "Sunset Wedding",
    description: "A beautiful outdoor wedding ceremony at sunset",
    coverImage: img(DEMO_PHOTO_FILE_IDS[0], 800, 600),
    category: "Weddings",
    imageCount: 45,
    isPrivate: false,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    slug: "portrait-session-spring",
    title: "Spring Portrait Session",
    description: "Professional portrait photography in natural light",
    coverImage: img(DEMO_PHOTO_FILE_IDS[1], 800, 600),
    category: "Portraits",
    imageCount: 32,
    isPrivate: false,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    slug: "corporate-event-2024",
    title: "Corporate Event 2024",
    description: "Annual company event coverage",
    coverImage: img(DEMO_PHOTO_FILE_IDS[2], 800, 600),
    category: "Corporate",
    imageCount: 78,
    isPrivate: false,
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    slug: "pet-photography-session",
    title: "Pet Photography Session",
    description: "Adorable pet portraits in studio",
    coverImage: img(DEMO_PHOTO_FILE_IDS[3], 800, 600),
    category: "Pets",
    imageCount: 28,
    isPrivate: false,
    createdAt: "2024-03-25",
  },
];

// =====================
// Mock Photos (Album gallery)
// =====================

export function getMockPhotos(albumId: string, limit = 20): Photo[] {
  const photos: Photo[] = [];

  const full = (id: string) => img(id, 1920, 1280);
  const thumb = (id: string) => img(id, 400, 300);

  for (let i = 0; i < limit; i++) {
    const id = DEMO_PHOTO_FILE_IDS[i % DEMO_PHOTO_FILE_IDS.length];
    photos.push({
      id: `${albumId}-${i}`,
      url: full(id),
      thumbnailUrl: thumb(id),
      alt: `Photo ${i + 1} from album`,
      width: 1920,
      height: 1280,
    });
  }

  return photos;
}

// =====================
// Mock Blog Posts
// =====================

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "tips-for-wedding-photography",
    title: "10 Tips for Perfect Wedding Photography",
    excerpt:
      "Learn essential techniques for capturing beautiful wedding moments that will last a lifetime.",
    content: `
      <h2>Introduction</h2>
      <p>Wedding photography is an art that requires both technical skill and emotional sensitivity.</p>

      <h2>1. Plan Ahead</h2>
      <p>Scout the location beforehand and understand the lighting conditions.</p>

      <h2>2. Capture Candid Moments</h2>
      <p>Some of the most beautiful wedding photos are unposed.</p>
    `,
    coverImage: img(DEMO_PHOTO_FILE_IDS[4], 1200, 630),
    author: "John Doe",
    publishedAt: "2024-01-10",
    tags: ["Wedding", "Photography Tips", "Guide"],
  },
  {
    id: "2",
    slug: "portrait-photography-basics",
    title: "Portrait Photography Basics",
    excerpt:
      "Master the fundamentals of portrait photography and create stunning images of people.",
    content: `
      <h2>Introduction</h2>
      <p>Portrait photography is about capturing the essence of a person.</p>

      <h2>Lighting</h2>
      <p>Soft, diffused light works best for portraits.</p>
    `,
    coverImage: img(DEMO_PHOTO_FILE_IDS[5], 1200, 630),
    author: "Jane Smith",
    publishedAt: "2024-02-15",
    tags: ["Portraits", "Tutorial", "Photography"],
  },
];

// =====================
// Mock Services
// =====================

export const mockServices: Service[] = [
  {
    id: "1",
    title: "Wedding Photography",
    description:
      "Capture your special day with our comprehensive wedding photography packages.",
    price: "Starting from £1,500",
    features: [
      "Full day coverage (8–10 hours)",
      "Pre-wedding consultation",
      "Online gallery with high-resolution images",
      "USB with all edited photos",
    ],
    image: img(DEMO_PHOTO_FILE_IDS[0], 800, 600),
  },
  {
    id: "2",
    title: "Portrait Sessions",
    description:
      "Professional portrait photography for individuals, families, and couples.",
    price: "Starting from £250",
    features: [
      "1–2 hour session",
      "Location or studio options",
      "10–15 edited digital images",
      "Online gallery access",
    ],
    image: img(DEMO_PHOTO_FILE_IDS[1], 800, 600),
  },
];
