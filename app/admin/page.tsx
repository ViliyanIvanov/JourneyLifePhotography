import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Images, FileText, Users, Eye } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Admin Dashboard',
  noindex: true,
});

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Albums',
      value: '12',
      description: '4 public, 8 private',
      icon: Images,
    },
    {
      title: 'Blog Posts',
      value: '8',
      description: '6 published, 2 drafts',
      icon: FileText,
    },
    {
      title: 'Total Photos',
      value: '1,234',
      description: 'Across all albums',
      icon: Eye,
    },
    {
      title: 'Contact Requests',
      value: '24',
      description: 'This month',
      icon: Users,
    },
  ];

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="font-medium">New album created</p>
                <p className="text-muted-foreground">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Blog post published</p>
                <p className="text-muted-foreground">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Contact form submitted</p>
                <p className="text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/albums/new"
                className="block text-sm text-primary hover:underline"
              >
                Create new album
              </a>
              <a
                href="/admin/blog/new"
                className="block text-sm text-primary hover:underline"
              >
                Write blog post
              </a>
              <a
                href="/admin/settings"
                className="block text-sm text-primary hover:underline"
              >
                Update settings
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

