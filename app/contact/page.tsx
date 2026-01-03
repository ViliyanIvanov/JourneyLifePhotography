import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { ContactInfoSection } from '@/components/sections/contact-info-section';

export const metadata = createMetadata({
  title: 'Contact',
  description:
    'Get in touch with Journey Life Photography to discuss your photography needs.',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />
      <main>
        <ContactInfoSection />
      </main>
    </>
  );
}

