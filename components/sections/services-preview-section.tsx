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
    <Card className="group overflow-hidden border-2 border-transparent bg-gradient-to-b from-brand-dark-1 to-brand-black card-glow-hover transition-all duration-500 hover:border-brand-accent/30 hover:-translate-y-1 hover:scale-[1.02]">
      {/* Top edge highlight */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.15]"
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
              <span className="text-brand-accent/60 text-sm">—</span>
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
    <SectionShell background="black" blendEdges className="py-32 md:py-48">
      {/* Soft inner background — gradient fades in/out so no hard edge */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(20,20,20,0.6) 15%, rgba(20,20,20,0.6) 85%, transparent 100%)',
        }}
      />
      {/* Accent radial glows */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(196,137,138,0.10) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(196,137,138,0.07) 0%, transparent 50%)',
        }}
      />

      <ScrollAnimation direction="fade" delay={0}>
        <div className="mb-28 max-w-4xl">
          <div className="mb-6 h-px w-12 origin-left animate-line-grow bg-brand-accent" />
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
          <ScrollAnimation key={service.id} direction="up" delay={150 + index * 250}>
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
