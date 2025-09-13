import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

interface LeadershipProfileProps {
  id: number;
  name: string;
  designation: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
}

export default function LeadershipProfile({ 
  id, 
  name, 
  designation, 
  image, 
  bio, 
  email, 
  phone 
}: LeadershipProfileProps) {
  const handleContact = (type: 'email' | 'phone') => {
    console.log(`Contact ${type} clicked for:`, name);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover-elevate h-full">
      <CardContent className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-lg">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <h3 
          className="font-bold text-lg mb-2"
          data-testid={`profile-name-${id}`}
        >
          {name}
        </h3>
        
        <p 
          className="text-primary font-medium mb-3"
          data-testid={`profile-designation-${id}`}
        >
          {designation}
        </p>
        
        <p 
          className="text-muted-foreground text-sm mb-4 line-clamp-3"
          data-testid={`profile-bio-${id}`}
        >
          {bio}
        </p>
        
        <div className="flex justify-center space-x-2">
          {email && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleContact('email')}
              data-testid={`button-email-${id}`}
            >
              <Mail className="h-4 w-4" />
            </Button>
          )}
          {phone && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleContact('phone')}
              data-testid={`button-phone-${id}`}
            >
              <Phone className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}