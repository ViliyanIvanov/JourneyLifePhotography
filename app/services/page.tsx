import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { ServicesListSection } from '@/components/sections/services-list-section';
import { ServicesProcessSection } from '@/components/sections/services-process-section';
import { mockServices } from '@/content/mock-data';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Professional photography services including weddings, portraits, corporate events, and pet photography.',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Professional photography services tailored to your needs"
      />
      <main>
        <ServicesListSection services={mockServices} />
        <ServicesProcessSection />
      </main>
    </>
  );
}

