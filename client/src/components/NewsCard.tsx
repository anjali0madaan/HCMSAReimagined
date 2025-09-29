import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  isNew?: boolean;
}

export default function NewsCard({ id, title, excerpt, date, category, isNew = false }: NewsCardProps) {
  const [, setLocation] = useLocation();
  
  const handleReadMore = () => {
    setLocation(`/news/${id}`);
  };
  
  const handleCardClick = () => {
    setLocation(`/news/${id}`);
  };

  return (
    <Card className="hover-elevate group cursor-pointer h-full" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          {isNew && (
            <Badge variant="destructive" className="text-xs">
              New
            </Badge>
          )}
        </div>
        <h3 
          className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors"
          data-testid={`news-title-${id}`}
        >
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p 
          className="text-muted-foreground mb-4 line-clamp-3"
          data-testid={`news-excerpt-${id}`}
        >
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span data-testid={`news-date-${id}`}>{date}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary"
            onClick={handleReadMore}
            data-testid={`button-read-more-${id}`}
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}