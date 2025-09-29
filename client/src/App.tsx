import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Homepage from "@/pages/Homepage";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Publications from "@/pages/Publications";
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
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={EventDetail} />
      <Route path="/publications" component={Publications} />
      <Route path="/publications/:id" component={PublicationDetail} />
      
      {/* Admin routes - explicit routes for better routing reliability */}
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
      
      {/* News Management */}
      <Route path="/admin/news">
        <AdminLayout>
          <NewsManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/news/new">
        <AdminLayout>
          <NewsForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/news/edit/:id">
        <AdminLayout>
          <NewsForm />
        </AdminLayout>
      </Route>
      
      {/* Events Management */}
      <Route path="/admin/events">
        <AdminLayout>
          <EventsManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/events/new">
        <AdminLayout>
          <EventsForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/events/edit/:id">
        <AdminLayout>
          <EventsForm />
        </AdminLayout>
      </Route>
      
      {/* Publications Management */}
      <Route path="/admin/publications">
        <AdminLayout>
          <PublicationsManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/publications/new">
        <AdminLayout>
          <PublicationsForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/publications/edit/:id">
        <AdminLayout>
          <PublicationsForm />
        </AdminLayout>
      </Route>
      
      {/* Leadership Management */}
      <Route path="/admin/leadership">
        <AdminLayout>
          <LeadershipManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/leadership/new">
        <AdminLayout>
          <LeadershipForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/leadership/edit/:id">
        <AdminLayout>
          <LeadershipForm />
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
