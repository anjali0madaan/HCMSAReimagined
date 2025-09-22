import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Homepage from "@/pages/Homepage";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import PublicationDetail from "@/pages/PublicationDetail";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminLayout from "@/pages/Admin/Layout";
import NewsManagement from "@/pages/Admin/NewsManagement";
import EventsManagement from "@/pages/Admin/EventsManagement";
import PublicationsManagement from "@/pages/Admin/PublicationsManagement";
import LeadershipManagement from "@/pages/Admin/LeadershipManagement";
import NewsForm from "@/pages/Admin/NewsForm";
import EventsForm from "@/pages/Admin/EventsForm";
import PublicationsForm from "@/pages/Admin/PublicationsForm";
import LeadershipForm from "@/pages/Admin/LeadershipForm";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={EventDetail} />
      <Route path="/publications/:id" component={PublicationDetail} />
      
      {/* Admin routes - explicit exact route + catch-all for subpaths */}
      <Route path="/admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/:rest*">
        <AdminLayout>
          <Switch>
            <Route path="/admin/news" component={NewsManagement} />
            <Route path="/admin/news/new" component={NewsForm} />
            <Route path="/admin/news/edit/:id" component={NewsForm} />
            <Route path="/admin/events" component={EventsManagement} />
            <Route path="/admin/events/new" component={EventsForm} />
            <Route path="/admin/events/edit/:id" component={EventsForm} />
            <Route path="/admin/publications" component={PublicationsManagement} />
            <Route path="/admin/publications/new" component={PublicationsForm} />
            <Route path="/admin/publications/edit/:id" component={PublicationsForm} />
            <Route path="/admin/leadership" component={LeadershipManagement} />
            <Route path="/admin/leadership/new" component={LeadershipForm} />
            <Route path="/admin/leadership/edit/:id" component={LeadershipForm} />
            <Route component={() => <div className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-muted-foreground">The requested admin page could not be found.</p>
              </div>
            </div>} />
          </Switch>
        </AdminLayout>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
