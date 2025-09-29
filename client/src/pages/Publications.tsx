import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicationCard from "@/components/PublicationCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Publication } from "@shared/schema";

export default function Publications() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  // Fetch all published publications from database
  const { data: publicationsData, isLoading } = useQuery<Publication[]>({
    queryKey: ['/api/cms/publications'],
    select: (data) => data?.filter(publication => publication.published) || []
  });

  // Transform publications data for display using real UUIDs
  const allPublications = publicationsData?.map((publication) => ({
    id: publication.id, // Use real UUID from database  
    title: publication.title,
    description: publication.description || "",
    category: publication.category,
    publishedDate: publication.publication_date ? new Date(publication.publication_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "Not specified",
    fileSize: "2.5 MB", // Default value
    fileFormat: "PDF", // Default value
    downloadUrl: publication.document_file || "#",
    department: "HCMSA",
    isNew: false,
    isImportant: false,
    referenceNumber: undefined
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
              All Publications
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access important documents, guidelines, reports, and resources published by the 
              Haryana Civil Medical Services Association.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading publications...</p>
            </div>
          )}

          {/* Publications Grid */}
          {!isLoading && (
            <>
              {allPublications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPublications.map((publication) => (
                    <PublicationCard key={publication.id} {...publication} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No published publications available at this time.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon for new documents and resources.</p>
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