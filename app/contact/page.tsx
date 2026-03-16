import { createMetadata } from '@/lib/seo';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ContactPageContent } from '@/components/sections/contact-page-content';

export const metadata = createMetadata({
  title: 'Contact',
  description:
    'Get in touch with Iva Dimitrov Photography to discuss your photography needs.',
});

const ATMOSPHERE_PHOTO =
  '/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg';

export default function ContactPage() {
  return (
    <>
      <AtmosphereBackground photoUrl={ATMOSPHERE_PHOTO} darkness={88} />
      <div className="relative z-[1]">
        <main>
          <ContactPageContent />
        </main>
      </div>
    </>
  );
}
