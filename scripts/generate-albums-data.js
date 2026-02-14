#!/usr/bin/env node

/**
 * Generate albums data from folder structure
 * Run: node scripts/generate-albums-data.js
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_PHOTOS_DIR = path.join(__dirname, '../public/JourneyLifePhotos');
const OUTPUT_FILE = path.join(__dirname, '../content/albums-data-full.ts');

// Album metadata
const albumMetadata = {
  'Weddings/Wedding 1': {
    title: 'Wedding 1',
    description: 'A beautiful wedding celebration captured in detail',
    category: 'Weddings',
  },
  'Weddings/Wedding 2': {
    title: 'Wedding 2',
    description: 'An elegant wedding ceremony and reception',
    category: 'Weddings',
  },
  'Weddings/Wedding 3': {
    title: 'Wedding 3',
    description: 'A romantic wedding captured throughout the day',
    category: 'Weddings',
  },
  'Weddings/Engagement': {
    title: 'Engagement Session',
    description: 'Pre-wedding engagement photo session',
    category: 'Weddings',
  },
  'Architecture and Interiors small': {
    title: 'Architecture & Interiors',
    description: 'Professional architectural and interior design photography',
    category: 'Architecture',
  },
  'Branding small': {
    title: 'Branding',
    description: 'Corporate branding and product photography',
    category: 'Branding',
  },
  'Children and family': {
    title: 'Children & Family',
    description: 'Heartwarming family and children photography',
    category: 'Family',
  },
  'Corporate small': {
    title: 'Corporate Events',
    description: 'Professional corporate event photography',
    category: 'Corporate',
  },
  'Travel small': {
    title: 'Travel Photography',
    description: 'Travel and adventure photography from around the world',
    category: 'Travel',
  },
};

function getImageDimensions(filePath) {
  // For now, return default dimensions
  // In production, you could use a library like 'image-size' to get actual dimensions
  return { width: 1920, height: 1440 };
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getAllImages(folderPath) {
  const images = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // Get relative path from PUBLIC_PHOTOS_DIR
        const relativePath = path
          .relative(PUBLIC_PHOTOS_DIR, filePath)
          .replace(/\\/g, '/');
        images.push(relativePath);
      }
    }
  }

  walkDir(folderPath);
  return images.sort();
}

function generateAlbumData() {
  const albums = [];
  let imageCounter = 0;

  // Process each album folder
  Object.entries(albumMetadata).forEach(([folderPath, metadata]) => {
    const fullPath = path.join(PUBLIC_PHOTOS_DIR, folderPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Folder not found: ${folderPath}`);
      return;
    }

    const images = getAllImages(fullPath);

    // Find cover image (usually starts with "album" or "Album cover")
    let coverImage = null;
    const coverMatch = images.find((img) =>
      /album[^\/]*cover|cover/i.test(img)
    );
    if (coverMatch) {
      coverImage = coverMatch;
    }
    // Fallback to first image
    if (!coverImage && images.length > 0) {
      coverImage = images[0];
    }

    const id = slugify(metadata.title);
    const slug = id;

    // Build image list
    const imageList = images.map((imagePath, index) => ({
      path: `/${imagePath}`,
      fileName: path.basename(imagePath),
      alt: `${metadata.title} - Photo ${index + 1}`,
    }));

    const album = {
      id,
      slug,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      coverImagePath: coverImage ? `/${coverImage}` : null,
      imageCount: images.length,
      images: imageList,
      isPrivate: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    albums.push(album);
    imageCounter += images.length;

    console.log(
      `✓ ${metadata.title}: ${images.length} images (${coverImage ? '✓ cover found' : '✗ no cover'})`
    );
  });

  return { albums, totalImages: imageCounter };
}

function generateTypeScriptFile(data) {
  const { albums, totalImages } = data;

  const albumsCode = albums
    .map(
      (album) => `
  {
    id: '${album.id}',
    slug: '${album.slug}',
    title: '${album.title.replace(/'/g, "\\'")}',
    description: '${album.description.replace(/'/g, "\\'")}',
    category: '${album.category}',
    coverImagePath: '${album.coverImagePath}',
    imageCount: ${album.imageCount},
    images: [
${album.images
  .map(
    (img) => `      {
        path: '${img.path}',
        fileName: '${img.fileName}',
        alt: '${img.alt.replace(/'/g, "\\'")}',
      }`
  )
  .join(',\n')}
    ],
    isPrivate: false,
    createdAt: '${album.createdAt}',
  }`
    )
    .join(',\n');

  const content = `// =====================
// Album Configuration with Full Photo Lists
// Generated by: scripts/generate-albums-data.js
// Total Images: ${totalImages}
// Last Generated: ${new Date().toISOString()}
// =====================

export interface AlbumImage {
  path: string;
  fileName: string;
  alt: string;
}

export interface AlbumConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImagePath: string | null;
  imageCount: number;
  images: AlbumImage[];
  isPrivate: boolean;
  createdAt: string;
}

// Get the image URL based on environment
export function getImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/JourneyLifePhotos';
  return \`\${baseUrl}\${path.startsWith('/') ? path : '/' + path}\`;
}

export const albumsData: AlbumConfig[] = [${albumsCode}
];

// Helper to get all albums with proper image URLs
export function getAllAlbums() {
  return albumsData.map(album => ({
    ...album,
    coverImage: album.coverImagePath ? getImageUrl(album.coverImagePath) : '/placeholder-album.jpg',
  }));
}

// Helper to get album by slug
export function getAlbumBySlug(slug: string) {
  return albumsData.find(album => album.slug === slug);
}

// Helper to get album images with full URLs
export function getAlbumImages(albumId: string) {
  const album = albumsData.find(a => a.id === albumId);
  if (!album) return [];

  return album.images.map(img => ({
    ...img,
    url: getImageUrl(img.path),
  }));
}
`;

  return content;
}

// Main execution
try {
  console.log('📸 Generating albums data...\n');
  const data = generateAlbumData();
  const tsContent = generateTypeScriptFile(data);

  fs.writeFileSync(OUTPUT_FILE, tsContent);

  console.log(`\n✅ Generated: ${OUTPUT_FILE}`);
  console.log(`📊 Total: ${data.albums.length} albums, ${data.totalImages} images`);
  console.log('\n💡 Update your imports to use albums-data-full instead of albums-data');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
