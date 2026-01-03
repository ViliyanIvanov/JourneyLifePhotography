import { SectionShell } from '@/components/ui/section-shell';
import { Text } from '@/components/ui/text';

export function AboutIntroSection() {
  return (
    <SectionShell padding="md">
      <Text size="lg" className="mb-6">
        At Journey Life Photography, we believe that every moment tells a story. Our mission is to
        capture those precious, fleeting moments that make life beautiful and meaningful.
      </Text>
      <Text size="lg" className="mb-6">
        With years of experience in professional photography, we specialize in weddings, portraits,
        corporate events, and pet photography. Each session is approached with creativity,
        attention to detail, and a genuine passion for storytelling through imagery.
      </Text>
      <Text size="lg">
        We understand that photography is more than just taking pictures—it&apos;s about preserving
        memories, emotions, and the essence of special moments that you&apos;ll treasure for a
        lifetime.
      </Text>
    </SectionShell>
  );
}

