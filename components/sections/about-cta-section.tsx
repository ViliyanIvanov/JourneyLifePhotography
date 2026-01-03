import { SectionShell } from '@/components/ui/section-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutCtaSection() {
  return (
    <SectionShell padding="md">
      <div className="text-center">
        <Card className="bg-brand-black text-brand-white border-2 border-brand-emerald/20">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Let&apos;s Work Together</CardTitle>
            <CardDescription className="text-brand-white/70">
              Ready to capture your special moments? Get in touch with us today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}

