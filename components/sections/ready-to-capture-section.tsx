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
      className="min-h-[70vh] py-32 md:py-40"
    >
      <Container>
        <ScrollAnimation direction="up">
          <div className="max-w-3xl">
            <Heading as="h2" size="3xl" className="mb-8">
              Ready to Capture Your Story?
            </Heading>
            <Text size="xl" className="mb-12">
              Let&apos;s discuss your photography needs and create something beautiful together.
            </Text>
            <Button asChild size="lg">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </Overlay>
  );
}

