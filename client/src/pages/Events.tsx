import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { events } from "@shared/data";

export default function Events() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  const allEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: event.time,
    venue: event.venue,
    category: event.category,
    registrationOpen: event.registrationOpen,
    attendees: event.attendees
  }));

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

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          {/* Empty State */}
          {allEvents.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                There are currently no events scheduled. Please check back later.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}