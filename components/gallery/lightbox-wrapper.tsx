'use client';

import LightboxComponent from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Photo } from '@/content/mock-data';

interface LightboxWrapperProps {
  photos: Photo[];
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
  const slides = photos.map((photo) => ({
    src: photo.url,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  }));

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

