import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  registrationOpen: boolean;
  attendees?: number;
}

export default function EventCard({ 
  id, 
  title, 
  description, 
  date, 
  time, 
  venue, 
  category, 
  registrationOpen,
  attendees 
}: EventCardProps) {
  const handleRegister = () => {
    console.log("Registration clicked for event:", id);
  };

  const handleViewDetails = () => {
    console.log("View details clicked for event:", id);
  };

  return (
    <Card className="hover-elevate h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          {registrationOpen && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Registration Open
            </Badge>
          )}
        </div>
        <h3 
          className="font-semibold text-lg mb-2"
          data-testid={`event-title-${id}`}
        >
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p 
          className="text-muted-foreground mb-4 line-clamp-2"
          data-testid={`event-description-${id}`}
        >
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span data-testid={`event-date-${id}`}>{date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span data-testid={`event-time-${id}`}>{time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span data-testid={`event-venue-${id}`}>{venue}</span>
          </div>
          {attendees && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span data-testid={`event-attendees-${id}`}>{attendees} registered</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
            data-testid={`button-view-details-${id}`}
          >
            View Details
          </Button>
          {registrationOpen && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRegister}
              data-testid={`button-register-${id}`}
            >
              Register
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}