'use client';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/api';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

export function AdminHeader() {
  const { username, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/admin" className="text-xl font-semibold hover:text-primary transition-colors">
            Admin Dashboard
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{username}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
