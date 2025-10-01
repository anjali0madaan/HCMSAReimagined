import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Download, Building, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

interface PublicationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
  fileSize: string;
  fileFormat: string;
  downloadUrl: string;
  isNew?: boolean;
  isImportant?: boolean;
  department: string;
  referenceNumber?: string;
}

export default function PublicationCard({
  id,
  title,
  description,
  category,
  publishedDate,
  fileSize,
  fileFormat,
  downloadUrl,
  isNew = false,
  isImportant = false,
  department,
  referenceNumber
}: PublicationCardProps) {
  const [, setLocation] = useLocation();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/publications/${id}`);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloadUrl && downloadUrl !== "#") {
      window.open(downloadUrl, '_blank');
    }
  };

  const handleCardClick = () => {
    setLocation(`/publications/${id}`);
  };

  return (
    <Card className="hover-elevate h-full cursor-pointer" onClick={handleCardClick} data-testid={`publication-card-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs" data-testid={`publication-category-${id}`}>
              {category}
            </Badge>
            {isNew && (
              <Badge variant="destructive" className="text-xs">
                New
              </Badge>
            )}
            {isImportant && (
              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Important
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span>{fileFormat}</span>
          </div>
        </div>
        
        <h3 
          className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2"
          data-testid={`publication-title-${id}`}
        >
          {title}
        </h3>
      </CardHeader>
      
      <CardContent>
        <p 
          className="text-muted-foreground mb-4 line-clamp-3 text-sm"
          data-testid={`publication-description-${id}`}
        >
          {description}
        </p>
        
        <div className="space-y-3">
          {/* Publication Details */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-2" />
              <span data-testid={`publication-date-${id}`}>
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Building className="h-3 w-3 mr-2" />
              <span className="line-clamp-1" data-testid={`publication-department-${id}`}>
                {department}
              </span>
            </div>
            {referenceNumber && (
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-2" />
                <span className="font-mono" data-testid={`publication-reference-${id}`}>
                  {referenceNumber}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground" data-testid={`publication-size-${id}`}>
              {fileSize}
            </span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewDetails}
                data-testid={`button-view-publication-${id}`}
              >
                View Details
              </Button>
              <Button 
                size="sm"
                onClick={handleDownload}
                data-testid={`button-download-${id}`}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}