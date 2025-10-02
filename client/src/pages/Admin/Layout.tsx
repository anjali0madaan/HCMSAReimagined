import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home,
  FileText, 
  Calendar, 
  BookOpen, 
  Users,
  LayoutDashboard,
  ExternalLink,
  Image,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { logout } = useAdminAuth();
  
  const handleLogout = () => {
    logout();
    setLocation('/admin/login');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'News', href: '/admin/news', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Publications', href: '/admin/publications', icon: BookOpen },
    { name: 'Leadership', href: '/admin/leadership', icon: Users },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location === '/admin';
    }
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                🏥 HCMSA Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="nav-view-website">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Website
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive(item.href) && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}