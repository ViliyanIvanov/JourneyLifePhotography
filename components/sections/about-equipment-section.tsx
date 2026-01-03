import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface EquipmentItem {
  title: string;
  description: string;
}

const equipment: EquipmentItem[] = [
  {
    title: 'Cameras',
    description:
      'We use professional-grade cameras from leading manufacturers to ensure exceptional image quality.',
  },
  {
    title: 'Lenses',
    description:
      'A comprehensive collection of prime and zoom lenses for every shooting scenario.',
  },
  {
    title: 'Lighting',
    description:
      'Professional lighting equipment for both studio and on-location shoots.',
  },
];

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <Card className="border-2 border-brand-white/10 bg-brand-black">
      <CardHeader>
        <CardTitle className="font-serif text-brand-white">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text size="sm" muted>
          {item.description}
        </Text>
      </CardContent>
    </Card>
  );
}

export function AboutEquipmentSection() {
  return (
    <SectionShell padding="md">
      <Heading as="h2" size="xl" className="text-center mb-12">
        Professional Equipment
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {equipment.map((item) => (
          <EquipmentCard key={item.title} item={item} />
        ))}
      </div>
    </SectionShell>
  );
}

