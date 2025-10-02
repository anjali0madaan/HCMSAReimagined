import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Homepage from "@/pages/Homepage";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Publications from "@/pages/Publications";
import PublicationDetail from "@/pages/PublicationDetail";
import AdminLogin from "@/pages/Admin/Login";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminLayout from "@/pages/Admin/Layout";
import NewsManagement from "@/pages/Admin/NewsManagement";
import EventsManagement from "@/pages/Admin/EventsManagement";
import PublicationsManagement from "@/pages/Admin/PublicationsManagement";
import LeadershipManagement from "@/pages/Admin/LeadershipManagement";
import GalleryManagement from "@/pages/Admin/GalleryManagement";
import NewsForm from "@/pages/Admin/NewsForm";
import EventsForm from "@/pages/Admin/EventsForm";
import PublicationsForm from "@/pages/Admin/PublicationsForm";
import LeadershipForm from "@/pages/Admin/LeadershipForm";
import GalleryForm from "@/pages/Admin/GalleryForm";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={EventDetail} />
      <Route path="/publications" component={Publications} />
      <Route path="/publications/:id" component={PublicationDetail} />
      
      {/* Admin Login */}
      <Route path="/admin/login" component={AdminLogin} />
      
      {/* Admin routes - protected with authentication */}
      <Route path="/admin">
        <ProtectedAdminRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/">
        <ProtectedAdminRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* News Management */}
      <Route path="/admin/news">
        <ProtectedAdminRoute>
          <AdminLayout><NewsManagement /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/news/new">
        <ProtectedAdminRoute>
          <AdminLayout><NewsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/news/edit/:id">
        <ProtectedAdminRoute>
          <AdminLayout><NewsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* Events Management */}
      <Route path="/admin/events">
        <ProtectedAdminRoute>
          <AdminLayout><EventsManagement /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/events/new">
        <ProtectedAdminRoute>
          <AdminLayout><EventsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/events/edit/:id">
        <ProtectedAdminRoute>
          <AdminLayout><EventsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* Publications Management */}
      <Route path="/admin/publications">
        <ProtectedAdminRoute>
          <AdminLayout><PublicationsManagement /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/publications/new">
        <ProtectedAdminRoute>
          <AdminLayout><PublicationsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/publications/edit/:id">
        <ProtectedAdminRoute>
          <AdminLayout><PublicationsForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* Leadership Management */}
      <Route path="/admin/leadership">
        <ProtectedAdminRoute>
          <AdminLayout><LeadershipManagement /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/leadership/new">
        <ProtectedAdminRoute>
          <AdminLayout><LeadershipForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/leadership/edit/:id">
        <ProtectedAdminRoute>
          <AdminLayout><LeadershipForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* Gallery Management */}
      <Route path="/admin/gallery">
        <ProtectedAdminRoute>
          <AdminLayout><GalleryManagement /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/gallery/new">
        <ProtectedAdminRoute>
          <AdminLayout><GalleryForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      <Route path="/admin/gallery/:id">
        <ProtectedAdminRoute>
          <AdminLayout><GalleryForm /></AdminLayout>
        </ProtectedAdminRoute>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
