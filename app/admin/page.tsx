'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Images, FileText, Mail, Eye } from 'lucide-react';
import Link from 'next/link';
import {
  useAuth,
  useAdminAlbums,
  useAdminBlogPosts,
  useAdminContactSubmissions,
} from '@/lib/api';

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  isLoading,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLoading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { isAuthenticated, username, isLoading: authLoading } = useAuth();

  // Fetch dashboard data
  const { data: albumsData, isLoading: albumsLoading } = useAdminAlbums(
    { page: 1, pageSize: 1 },
    { enabled: isAuthenticated }
  );

  const { data: blogData, isLoading: blogLoading } = useAdminBlogPosts(
    { page: 1, pageSize: 1 },
    { enabled: isAuthenticated }
  );

  const { data: contactData, isLoading: contactLoading } = useAdminContactSubmissions(
    { page: 1, pageSize: 1, unreadOnly: true },
    { enabled: isAuthenticated }
  );

  // Calculate stats
  const totalAlbums = albumsData?.totalItems || 0;
  const totalPosts = blogData?.totalItems || 0;
  const unreadContacts = contactData?.totalItems || 0;

  // Published vs draft counts (we'd need additional API calls for accurate counts)
  const publishedPosts = blogData?.items.filter((p) => p.isPublished).length || 0;
  const publicAlbums = albumsData?.items.filter((a) => !a.isPrivate).length || 0;

  const isLoading = authLoading || albumsLoading || blogLoading || contactLoading;

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back{username ? `, ${username}` : ''}!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Albums"
          value={totalAlbums}
          description={`${publicAlbums} public albums`}
          icon={Images}
          isLoading={isLoading}
        />
        <StatCard
          title="Blog Posts"
          value={totalPosts}
          description={`${publishedPosts} published`}
          icon={FileText}
          isLoading={isLoading}
        />
        <StatCard
          title="Unread Messages"
          value={unreadContacts}
          description="Contact submissions"
          icon={Mail}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Photos"
          value="—"
          description="Across all albums"
          icon={Eye}
          isLoading={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/admin/albums/new"
                className="block text-sm text-primary hover:underline"
              >
                Create new album
              </Link>
              <Link
                href="/admin/blog/new"
                className="block text-sm text-primary hover:underline"
              >
                Write blog post
              </Link>
              <Link
                href="/admin/settings"
                className="block text-sm text-primary hover:underline"
              >
                Update settings
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {albumsData?.items[0] && (
                <div className="text-sm">
                  <p className="font-medium">Album: {albumsData.items[0].title}</p>
                  <p className="text-muted-foreground">
                    {new Date(albumsData.items[0].createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {blogData?.items[0] && (
                <div className="text-sm">
                  <p className="font-medium">Post: {blogData.items[0].title}</p>
                  <p className="text-muted-foreground">
                    {blogData.items[0].publishedAt
                      ? new Date(blogData.items[0].publishedAt).toLocaleDateString()
                      : 'Draft'}
                  </p>
                </div>
              )}
              {!albumsData?.items[0] && !blogData?.items[0] && !isLoading && (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
              {isLoading && (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
