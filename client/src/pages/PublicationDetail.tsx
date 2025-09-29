import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, FileText, Download, Building, AlertCircle, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import type { Publication } from "@shared/schema";

export default function PublicationDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const publicationId = params.id;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch single publication from database
  const { data: publication, isLoading, error } = useQuery<Publication>({
    queryKey: ['/api/cms/publications', publicationId],
    enabled: !!publicationId
  });

  const handleBack = () => {
    setLocation("/");
  };

  const handleDownload = () => {
    if (publication?.document_file) {
      // In a real app, this would trigger the actual download
      window.open(publication.document_file, '_blank');
    } else {
      alert(`Download not available for: ${publication?.title}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading publication...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Publication Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested publication could not be found.</p>
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

  // Get category display info
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { label: string; color: string }> = {
      guidelines: { label: "Guidelines", color: "bg-blue-100 text-blue-800" },
      reports: { label: "Reports", color: "bg-green-100 text-green-800" },
      newsletters: { label: "Newsletters", color: "bg-purple-100 text-purple-800" },
      research: { label: "Research", color: "bg-orange-100 text-orange-800" }
    };
    return categoryMap[category] || { label: category, color: "bg-gray-100 text-gray-800" };
  };

  const categoryInfo = getCategoryInfo(publication.category);

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
            Back to Publications
          </Button>

          {/* Publication Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge 
                className={categoryInfo.color}
                data-testid="publication-category"
              >
                {categoryInfo.label}
              </Badge>
              {publication.published && (
                <Badge variant="secondary">Published</Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-4" data-testid="publication-title">
              {publication.title}
            </h1>
            
            {publication.description && (
              <p className="text-xl text-muted-foreground mb-6" data-testid="publication-description">
                {publication.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              {publication.publication_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="publication-date">
                    {new Date(publication.publication_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span data-testid="publication-author">
                  {publication.author || "HCMSA"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>PDF Document</span>
              </div>
            </div>
          </div>

          {/* Publication Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Publication Details</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Publication Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-muted-foreground capitalize">
                    {publication.category}
                  </p>
                </div>
                
                {publication.author && (
                  <div>
                    <h3 className="font-semibold mb-2">Author/Department</h3>
                    <p className="text-muted-foreground">
                      {publication.author}
                    </p>
                  </div>
                )}
                
                {publication.publication_date && (
                  <div>
                    <h3 className="font-semibold mb-2">Publication Date</h3>
                    <p className="text-muted-foreground">
                      {new Date(publication.publication_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold mb-2">Format</h3>
                  <p className="text-muted-foreground">PDF Document</p>
                </div>
              </div>

              {/* Description */}
              {publication.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {publication.description}
                  </p>
                </div>
              )}

              {/* Download Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Download Publication</h3>
                    <p className="text-sm text-muted-foreground">
                      Access the complete document in PDF format
                    </p>
                  </div>
                  <Button 
                    onClick={handleDownload}
                    disabled={!publication.document_file}
                    data-testid="button-download"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                {!publication.document_file && (
                  <div className="flex items-center gap-2 mt-4 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-yellow-700">
                      Document file is not currently available for download.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Information */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">About HCMSA Publications</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The Haryana Civil Medical Services Association publishes various documents 
                including guidelines, reports, newsletters, and research papers to support 
                healthcare professionals and improve medical services across Haryana.
              </p>
              <p className="text-muted-foreground">
                For questions about this publication or to request additional information, 
                please contact the HCMSA office.
              </p>
            </CardContent>
          </Card>

          {/* Publication Footer */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published by HCMSA • Category: {categoryInfo.label}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBack} data-testid="button-back-to-publications">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Publications
                </Button>
                <Button onClick={() => setLocation("/")} data-testid="button-home">
                  Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}