import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";

export default function Events() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  // Fetch all published events from database
  const { data: eventsData, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/cms/events'],
    select: (data) => data?.filter(event => event.published) || []
  });

  // Transform events data for display
  const allEvents = eventsData?.map((event, index) => ({
    id: index + 1, // Use numeric ID for component
    title: event.title,
    description: event.description,
    date: event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "TBD",
    time: event.event_date ? new Date(event.event_date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }) : "TBD",
    venue: event.location || "TBD",
    category: "Event",
    registrationOpen: true, // Default to true
    attendees: 0 // Default value
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-6"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" data-testid="page-title">
              All Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with all HCMSA events, conferences, and training programs. 
              Join us in advancing healthcare excellence in Haryana.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && (
            <>
              {allEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No published events available at this time.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon for upcoming events and programs.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}