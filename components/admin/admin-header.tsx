import { Container } from '@/components/layout/container';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
      </Container>
    </header>
  );
}

