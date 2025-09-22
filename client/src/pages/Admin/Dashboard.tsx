import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Users, 
  Plus,
  Activity,
  Database,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Quick stats component
function QuickStats() {
  const { data: news } = useQuery({ 
    queryKey: ['/api/cms/news'], 
    select: (data: any[]) => data?.length || 0 
  });
  const { data: events } = useQuery({ 
    queryKey: ['/api/cms/events'], 
    select: (data: any[]) => data?.length || 0 
  });
  const { data: publications } = useQuery({ 
    queryKey: ['/api/cms/publications'], 
    select: (data: any[]) => data?.length || 0 
  });
  const { data: leadership } = useQuery({ 
    queryKey: ['/api/cms/leadership'], 
    select: (data: any[]) => data?.length || 0 
  });

  const stats = [
    { name: 'News Articles', value: news, icon: FileText, color: 'bg-blue-500' },
    { name: 'Events', value: events, icon: Calendar, color: 'bg-green-500' },
    { name: 'Publications', value: publications, icon: BookOpen, color: 'bg-purple-500' },
    { name: 'Leadership', value: leadership, icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} data-testid={`stat-${stat.name.toLowerCase().replace(' ', '-')}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value || 0}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Types for API responses
interface StatusResponse {
  cms: string;
  storage?: string;
  mode?: string;
  services?: {
    [key: string]: string;
  };
  error?: string;
}

// System status component
function SystemStatus() {
  const { data: status, isLoading } = useQuery<StatusResponse>({ 
    queryKey: ['/api/cms/status'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const cmsStatus = status?.cms || 'Unknown';
  const storageStatus = status?.storage || status?.mode || 'Unknown';
  const services = status?.services || {};

  return (
    <Card data-testid="system-status">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>CMS Connection</span>
              <Badge 
                variant={cmsStatus === 'connected' ? 'default' : 'destructive'}
                className="flex items-center gap-1"
              >
                {cmsStatus === 'connected' ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                {cmsStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                {storageStatus}
              </Badge>
            </div>
            {Object.keys(services).length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium mb-2">Services</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(services).map(([service, serviceStatus]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="capitalize">{service}</span>
                      <Badge 
                        variant={serviceStatus === 'ok' ? 'default' : 'destructive'} 
                        className="h-5 text-xs"
                      >
                        {serviceStatus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Quick actions component
function QuickActions() {
  const actions = [
    { name: 'Add News', href: '/admin/news/new', icon: FileText, color: 'bg-blue-500' },
    { name: 'Add Event', href: '/admin/events/new', icon: Calendar, color: 'bg-green-500' },
    { name: 'Add Publication', href: '/admin/publications/new', icon: BookOpen, color: 'bg-purple-500' },
    { name: 'Add Leadership', href: '/admin/leadership/new', icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <Card data-testid="quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Create new content</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {actions.map((action) => (
          <Link key={action.name} href={action.href}>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid={`button-${action.name.toLowerCase().replace(' ', '-')}`}
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.name}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

// Content management shortcuts
function ContentManagement() {
  const sections = [
    { 
      name: 'News Management', 
      href: '/admin/news', 
      icon: FileText, 
      description: 'Manage news articles and announcements' 
    },
    { 
      name: 'Event Management', 
      href: '/admin/events', 
      icon: Calendar, 
      description: 'Schedule and manage events' 
    },
    { 
      name: 'Publications', 
      href: '/admin/publications', 
      icon: BookOpen, 
      description: 'Manage documents and publications' 
    },
    { 
      name: 'Leadership', 
      href: '/admin/leadership', 
      icon: Users, 
      description: 'Manage leadership profiles' 
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((section) => (
        <Card key={section.name} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <section.icon className="h-5 w-5" />
              {section.name}
            </CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={section.href}>
              <Button className="w-full" data-testid={`button-manage-${section.name.toLowerCase().split(' ')[0]}`}>
                Manage {section.name.split(' ')[0]}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  try {
    return (
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">HCMSA Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your content and monitor system status
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" data-testid="button-view-website">
              View Website
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <ContentManagement />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SystemStatus />
            <QuickActions />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminDashboard Error:', error);
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard Error</h1>
          <p className="text-muted-foreground">
            Error loading dashboard: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}