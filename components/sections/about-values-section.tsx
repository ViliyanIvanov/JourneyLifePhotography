import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Camera, Heart, Award, Users } from 'lucide-react';

interface Value {
  icon: typeof Camera;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Camera,
    title: 'Excellence',
    description:
      'We strive for perfection in every shot, ensuring the highest quality results.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'Photography is our passion, and it shows in every project we undertake.',
  },
  {
    icon: Award,
    title: 'Professionalism',
    description:
      'We maintain the highest standards of professionalism and reliability.',
  },
  {
    icon: Users,
    title: 'Connection',
    description:
      'We build genuine connections with our clients to understand their vision.',
  },
];

function ValueCard({ value }: { value: Value }) {
  const Icon = value.icon;
  return (
    <Card className="border-2 border-brand-white/10 bg-black hover:border-brand-white/20 transition-colors">
      <CardHeader>
        <Icon className="h-8 w-8 text-brand-white mb-2" />
        <CardTitle className="font-serif text-brand-white">{value.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-brand-white/70">{value.description}</p>
      </CardContent>
    </Card>
  );
}

export function AboutValuesSection() {
  return (
    <SectionShell padding="lg" background="black">
      <ScrollAnimation direction="up" delay={0}>
        <Heading as="h2" size="xl" className="text-center mb-12">
          Our Values
        </Heading>
      </ScrollAnimation>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <ScrollAnimation key={value.title} direction="up" delay={200 + index * 100}>
            <ValueCard value={value} />
          </ScrollAnimation>
        ))}
      </div>
    </SectionShell>
  );
}

