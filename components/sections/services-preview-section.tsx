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
    <Card className="group overflow-hidden border-2 border-transparent bg-brand-black hover:border-brand-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.1)] hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-xl md:text-2xl text-brand-white leading-tight">{service.title}</CardTitle>
        <CardDescription className="text-sm text-brand-white/60 mt-2">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-brand-white/50 text-sm">—</span>
              <span className="text-sm text-brand-white/75">{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-6 w-full" variant="secondary">
          <Link href={`/services#${service.id}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ServicesPreviewSection({ services }: ServicesPreviewSectionProps) {
  return (
    <SectionShell className="py-32 md:py-48">
      <ScrollAnimation direction="fade" delay={0}>
        <div className="mb-28 max-w-4xl">
          <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
            Our Services
          </Heading>
          <Text size="lg" className="text-brand-white/70 leading-relaxed">
            Professional photography services tailored to your unique needs. From weddings to corporate events, we deliver exceptional results.
          </Text>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-20">
        {services.map((service, index) => (
          <ScrollAnimation key={service.id} direction="up" delay={200 + index * 200}>
            <ServiceCard service={service} />
          </ScrollAnimation>
        ))}
      </div>

      <ScrollAnimation direction="up" delay={800}>
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </ScrollAnimation>
    </SectionShell>
  );
}

