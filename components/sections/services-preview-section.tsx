import { Service } from '@/content/mock-data';
import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesPreviewSectionProps {
  services: Service[];
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="overflow-hidden border-2 border-brand-white/10 bg-brand-black hover:border-brand-emerald/30 transition-colors">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-brand-white">{service.title}</CardTitle>
        <CardDescription className="text-brand-white/70">{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-4 text-brand-emerald">{service.price}</p>
        <ul className="space-y-2 text-sm text-brand-white/70">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-brand-emerald">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-4 w-full" variant="outline">
          <Link href={`/services#${service.id}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ServicesPreviewSection({ services }: ServicesPreviewSectionProps) {
  return (
    <SectionShell>
      <ScrollAnimation direction="fade">
        <div className="mb-20 max-w-3xl">
          <Heading as="h2" size="3xl" className="mb-8">
            Our Services
          </Heading>
          <Text size="xl">Professional photography services tailored to your needs</Text>
        </div>
      </ScrollAnimation>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {services.map((service, index) => (
          <ScrollAnimation key={service.id} direction="up" delay={index * 100}>
            <ServiceCard service={service} />
          </ScrollAnimation>
        ))}
      </div>
      <ScrollAnimation direction="fade" delay={200}>
        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </ScrollAnimation>
    </SectionShell>
  );
}

