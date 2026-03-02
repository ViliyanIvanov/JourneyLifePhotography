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
    <ScrollAnimation direction="up" delay={index * 150} className="h-full">
      <Card
        id={service.id}
        className="h-full flex flex-col overflow-hidden border border-brand-white/10 bg-gradient-to-b from-brand-dark-1 to-brand-black card-glow-hover hover:border-brand-white/20 transition-all duration-500"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
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
        <CardContent className="flex flex-col space-y-4 flex-grow">
          <p className="text-2xl font-semibold text-brand-white">{service.price}</p>
          <ul className="space-y-2 flex-grow">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-brand-white">•</span>
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
    <SectionShell padding="lg" background="dark-1">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
