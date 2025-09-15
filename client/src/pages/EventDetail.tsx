import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, Clock, MapPin, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventById } from "@shared/data";

export default function EventDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const eventId = parseInt(params.id || "1", 10);
  const event = getEventById(eventId);

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

  const handleBack = () => {
    setLocation("/");
  };

  const handleRegister = () => {
    // In a real app, this would redirect to registration form or external portal
    window.open("https://portal.hscmsassociation.co.in", "_blank");
  };

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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" data-testid="event-category">
                    {event.category}
                  </Badge>
                  {event.registrationOpen && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Registration Open
                    </Badge>
                  )}
                </div>
                {event.registrationOpen && (
                  <Button onClick={handleRegister} data-testid="button-register-main">
                    Register Now
                  </Button>
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
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground" data-testid="event-time">{event.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-muted-foreground" data-testid="event-venue">{event.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Organizer</p>
                      <p className="text-muted-foreground" data-testid="event-organizer">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-6">
                  {event.attendees && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground" data-testid="event-attendees">
                        {event.attendees} registered
                      </span>
                    </div>
                  )}
                  {event.registrationDeadline && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground" data-testid="event-deadline">
                        Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: event.content }}
                data-testid="event-content"
              />
            </CardContent>
          </Card>

          {/* Registration CTA */}
          {event.registrationOpen && (
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Join?</h3>
                <p className="text-muted-foreground mb-4">
                  Don't miss out on this valuable opportunity. Register now to secure your spot.
                </p>
                <Button size="lg" onClick={handleRegister} data-testid="button-register-cta">
                  Register for Event
                </Button>
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