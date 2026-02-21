import { SectionShell } from '@/components/ui/section-shell';
import { Text } from '@/components/ui/text';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function AboutIntroSection() {
  return (
    <SectionShell padding="lg" background="black">
      <ScrollAnimation direction="up" delay={0}>
        <Text size="lg" className="mb-6">
          At Iva Dimitrov Photography, we believe that every moment tells a story. Our mission is to
          capture those precious, fleeting moments that make life beautiful and meaningful.
        </Text>
      </ScrollAnimation>
      <ScrollAnimation direction="up" delay={200}>
        <Text size="lg" className="mb-6">
          With years of experience in professional photography, we specialize in weddings, portraits,
          corporate events, and pet photography. Each session is approached with creativity,
          attention to detail, and a genuine passion for storytelling through imagery.
        </Text>
      </ScrollAnimation>
      <ScrollAnimation direction="up" delay={400}>
        <Text size="lg">
          We understand that photography is more than just taking pictures—it&apos;s about preserving
          memories, emotions, and the essence of special moments that you&apos;ll treasure for a
          lifetime.
        </Text>
      </ScrollAnimation>
    </SectionShell>
  );
}

