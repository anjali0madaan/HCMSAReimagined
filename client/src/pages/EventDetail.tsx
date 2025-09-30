import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";

export default function EventDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const eventId = params.id;

  // Fetch event from database
  const { data: event, isLoading, error } = useQuery<Event>({
    queryKey: ['/api/cms/events', eventId],
    enabled: !!eventId,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = () => {
    setLocation("/events");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading event...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested event could not be found.</p>
            <Button onClick={() => setLocation("/")} data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const eventDate = event.event_date ? new Date(event.event_date) : null;
  const endDate = event.end_date ? new Date(event.end_date) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-6"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>

          {/* Event Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" data-testid="event-category">
                  Event
                </Badge>
                {event.registration_required && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Registration Open
                  </Badge>
                )}
              </div>
              
              <h1 
                className="text-3xl font-bold mb-4 text-foreground"
                data-testid="event-title"
              >
                {event.title}
              </h1>
            </CardHeader>
            
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6" data-testid="event-description">
                {event.description}
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground" data-testid="event-date">
                        {eventDate ? eventDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'TBD'}
                        {endDate && endDate.getTime() !== eventDate?.getTime() && (
                          <> - {endDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground" data-testid="event-time">
                        {eventDate ? eventDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'TBD'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-muted-foreground" data-testid="event-venue">
                        {event.location || 'TBD'}
                      </p>
                    </div>
                  </div>
                  
                  {event.registration_required && event.external_registration_url && (
                    <div className="flex items-center">
                      <Button 
                        asChild
                        className="w-full"
                        data-testid="button-register"
                      >
                        <a 
                          href={event.external_registration_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Register Now
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Content */}
          {event.description && (
            <Card>
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  data-testid="event-content"
                >
                  <p>{event.description}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back Button at Bottom */}
          <div className="mt-8 text-center">
            <Button onClick={handleBack} data-testid="button-back-bottom">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
