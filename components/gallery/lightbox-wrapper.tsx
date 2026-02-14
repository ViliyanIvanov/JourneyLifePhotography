'use client';

import LightboxComponent from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Photo } from '@/content/mock-data';
import type { MediaAssetDto } from '@/lib/api';

type PhotoData = Photo | MediaAssetDto;

interface LightboxWrapperProps {
  photos: PhotoData[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function LightboxWrapper({
  photos,
  index,
  onClose,
  onIndexChange,
}: LightboxWrapperProps) {
  const slides = photos.map((photo) => {
    // Handle both Photo and MediaAssetDto formats
    const imageUrl = 'url' in photo ? photo.url : photo.webUrl;
    const alt = 'alt' in photo ? photo.alt : (photo.altText || 'Photo');
    const width = photo.width || 1920;
    const height = photo.height || 1440;

    return {
      src: imageUrl,
      alt,
      width,
      height,
    };
  });

  return (
    <LightboxComponent
      open={true}
      close={onClose}
      index={index}
      slides={slides}
      on={{ view: ({ index }) => onIndexChange(index) }}
    />
  );
}

