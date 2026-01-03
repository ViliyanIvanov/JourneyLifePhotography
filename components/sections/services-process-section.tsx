import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    step: '1',
    title: 'Consultation',
    description:
      'We discuss your vision, requirements, and preferences to understand your needs.',
  },
  {
    step: '2',
    title: 'Photography',
    description:
      'We capture your special moments with professional equipment and expertise.',
  },
  {
    step: '3',
    title: 'Delivery',
    description:
      'You receive beautifully edited photos in your preferred format and gallery.',
  },
];

function ProcessCard({ item, index }: { item: ProcessStep; index: number }) {
  return (
    <ScrollAnimation direction="up" delay={index * 100}>
      <Card className="border-2 border-brand-white/10 bg-brand-black">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-brand-emerald text-brand-white flex items-center justify-center text-xl font-bold mb-4">
            {item.step}
          </div>
          <CardTitle className="font-serif text-brand-white">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text size="sm" muted>
            {item.description}
          </Text>
        </CardContent>
      </Card>
    </ScrollAnimation>
  );
}

export function ServicesProcessSection() {
  return (
    <SectionShell padding="md" className="border-t border-brand-white/10">
      <ScrollAnimation direction="fade">
        <Heading as="h2" size="xl" className="text-center mb-12">
          Our Process
        </Heading>
      </ScrollAnimation>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {processSteps.map((item, index) => (
          <ProcessCard key={item.step} item={item} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}

