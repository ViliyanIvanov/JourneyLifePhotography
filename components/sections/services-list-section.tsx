import { Service } from '@/content/mock-data';
import { SectionShell } from '@/components/ui/section-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesListSectionProps {
  services: Service[];
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <ScrollAnimation direction="up" delay={index * 150}>
      <Card
        id={service.id}
        className="overflow-hidden border-2 border-brand-white/10 bg-brand-black hover:border-brand-emerald/30 transition-colors"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-brand-white">{service.title}</CardTitle>
          <CardDescription className="text-base text-brand-white/70">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-semibold text-brand-emerald">{service.price}</p>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-brand-emerald">•</span>
                <span className="text-brand-white/70">{feature}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full mt-6">
            <Link href="/contact">Book Now</Link>
          </Button>
        </CardContent>
      </Card>
    </ScrollAnimation>
  );
}

export function ServicesListSection({ services }: ServicesListSectionProps) {
  return (
    <SectionShell padding="md">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}

