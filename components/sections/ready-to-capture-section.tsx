import { Container } from '@/components/layout/container';
import { Overlay } from '@/components/ui/overlay';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';

export function ReadyToCaptureSection() {
  return (
    <Overlay
      imageUrl="https://images.unsplash.com/photo-1677559027857-a3c27c877f54?auto=format&fit=crop&w=1920&h=1280&q=80"
      gradient="light"
      className="min-h-[80vh] py-40 md:py-56 flex items-center"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation direction="up" delay={100}>
            <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
              Ready to Capture Your Story?
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={300}>
            <Text size="lg" className="mb-16 text-brand-white/80 leading-relaxed">
              Let&apos;s discuss your vision and create something extraordinary together. Your moments deserve to be preserved with elegance and care.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={500}>
            <Button asChild size="lg">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </Container>
    </Overlay>
  );
}

