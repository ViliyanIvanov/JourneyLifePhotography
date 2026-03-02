import { Service } from '@/content/mock-data';
import { SectionShell } from '@/components/ui/section-shell';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesPreviewSectionProps {
  services: Service[];
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group overflow-hidden border-2 border-transparent bg-gradient-to-b from-brand-warm-3 to-brand-warm-1 card-glow-hover transition-all duration-500 hover:border-brand-accent/30 hover:-translate-y-1.5 hover:scale-[1.02]">
      {/* Top edge highlight */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
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
              <span className="text-brand-accent text-sm">—</span>
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
    <SectionShell background="warm-2" blendEdges className="py-32 md:py-48">
      {/* Accent radial glows */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(196,137,138,0.12) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(196,137,138,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Slow-drifting decorative accent lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="deco-line animate-drift"
          style={{ top: '15%', right: '8%', height: '80px', animationDelay: '0s' }}
        />
        <div
          className="deco-line animate-drift"
          style={{ top: '70%', left: '5%', height: '60px', animationDelay: '2s' }}
        />
        <div
          className="deco-dot animate-breathe"
          style={{ top: '25%', left: '12%', animationDelay: '1s' }}
        />
        <div
          className="deco-dot animate-breathe"
          style={{ top: '80%', right: '15%', animationDelay: '2.5s' }}
        />
      </div>

      <ScrollAnimation direction="left" delay={0}>
        <div className="mb-28 max-w-4xl">
          <div className="mb-6 h-px w-16 origin-left animate-draw-line bg-brand-accent" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-6 leading-tight tracking-tight">
            <SplitText text="Our Services" delay={80} className="inline" />
          </h2>
          <Text size="lg" className="text-brand-white/70 leading-relaxed">
            Professional photography services tailored to your unique needs. From weddings to corporate events, we deliver exceptional results.
          </Text>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-20">
        {services.map((service, index) => (
          <ScrollAnimation key={service.id} direction="up" delay={100 + index * 200} effect="float">
            <ServiceCard service={service} />
          </ScrollAnimation>
        ))}
      </div>

      <ScrollAnimation direction="up" delay={700} effect="float">
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </ScrollAnimation>
    </SectionShell>
  );
}
