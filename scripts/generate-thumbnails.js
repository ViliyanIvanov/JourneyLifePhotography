/**
 * Thumbnail Generation Script
 *
 * This script generates optimized thumbnails for all photos
 * to improve loading performance.
 *
 * Usage:
 *   npm install sharp
 *   node scripts/generate-thumbnails.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const THUMBNAIL_SIZE = 400; // 400x400 thumbnails
const QUALITY = 80; // JPEG quality
const SOURCE_DIR = path.join(__dirname, '../public/IvaDimitrovPhotos');
const THUMB_SUFFIX = '_thumb'; // e.g., photo_thumb.jpg

async function generateThumbnail(filePath, outputPath) {
  try {
    await sharp(filePath)
      .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outputPath);

    const originalSize = fs.statSync(filePath).size;
    const thumbSize = fs.statSync(outputPath).size;
    const savings = ((1 - thumbSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB → ${(thumbSize/1024).toFixed(0)}KB (${savings}% smaller)`);

    return { success: true, originalSize, thumbSize };
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return { success: false, error };
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalOriginal = 0;
  let totalThumb = 0;
  let count = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const result = await processDirectory(filePath);
      totalOriginal += result.totalOriginal;
      totalThumb += result.totalThumb;
      count += result.count;
    } else if (/\.(jpg|jpeg|png)$/i.test(file) && !file.includes(THUMB_SUFFIX)) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(dir, `${baseName}${THUMB_SUFFIX}.jpg`);

      // Skip if thumbnail already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⊘ Skipping ${file} (thumbnail exists)`);
        continue;
      }

      const result = await generateThumbnail(filePath, outputPath);
      if (result.success) {
        totalOriginal += result.originalSize;
        totalThumb += result.thumbSize;
        count++;
      }
    }
  }

  return { totalOriginal, totalThumb, count };
}

async function main() {
  console.log('🖼️  Generating thumbnails...\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Thumbnail size: ${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}`);
  console.log(`Quality: ${QUALITY}%\n`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const startTime = Date.now();
  const { totalOriginal, totalThumb, count } = await processDirectory(SOURCE_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n✅ Done!\n');
  console.log(`Processed: ${count} images`);
  console.log(`Original size: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Thumbnail size: ${(totalThumb / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total savings: ${((1 - totalThumb / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`Time: ${duration}s`);

  console.log('\n💡 Next steps:');
  console.log('1. Update albums-data-full.ts to use thumbnail URLs');
  console.log('2. Update photo-grid.tsx to use thumbUrl for grid, webUrl for lightbox');
}

main().catch(console.error);
