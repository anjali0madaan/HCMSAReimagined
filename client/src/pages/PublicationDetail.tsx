import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, FileText, Download, Building, AlertCircle, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublicationById } from "@shared/data";

export default function PublicationDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const publicationId = parseInt(params.id || "1", 10);
  const publication = getPublicationById(publicationId);

  if (!publication) {
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

  const handleBack = () => {
    setLocation("/");
  };

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading: ${publication.downloadUrl}`);
    // For prototype purposes, we'll show an alert
    alert(`Download would begin for: ${publication.title}\nFile: ${publication.fileFormat} (${publication.fileSize})`);
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
            Back to Publications
          </Button>

          {/* Publication Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" data-testid="publication-category">
                    {publication.category}
                  </Badge>
                  {publication.isNew && (
                    <Badge variant="destructive">New</Badge>
                  )}
                  {publication.isImportant && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Important
                    </Badge>
                  )}
                </div>
                <Button onClick={handleDownload} data-testid="button-download-main">
                  <Download className="h-4 w-4 mr-2" />
                  Download {publication.fileFormat}
                </Button>
              </div>
              
              <h1 
                className="text-3xl font-bold mb-4 text-foreground"
                data-testid="publication-title"
              >
                {publication.title}
              </h1>
            </CardHeader>
            
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6" data-testid="publication-description">
                {publication.description}
              </p>

              {/* Publication Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Published Date</p>
                      <p className="text-muted-foreground" data-testid="publication-date">
                        {new Date(publication.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Department</p>
                      <p className="text-muted-foreground" data-testid="publication-department">{publication.department}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">File Details</p>
                      <p className="text-muted-foreground" data-testid="publication-file-details">
                        {publication.fileFormat} • {publication.fileSize}
                      </p>
                    </div>
                  </div>
                  
                  {publication.referenceNumber && (
                    <div className="flex items-center">
                      <Hash className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Reference Number</p>
                        <p className="text-muted-foreground font-mono" data-testid="publication-reference">
                          {publication.referenceNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-medium mb-1">Quick Actions</p>
                    <p className="text-sm text-muted-foreground">
                      Download this publication or share with colleagues
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publication Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: publication.content }}
                data-testid="publication-content"
              />
            </CardContent>
          </Card>

          {/* Download CTA */}
          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Need this Document?</h3>
              <p className="text-muted-foreground mb-4">
                Download the complete {publication.fileFormat} document ({publication.fileSize}) for offline access and reference.
              </p>
              <Button size="lg" onClick={handleDownload} data-testid="button-download-cta">
                <Download className="h-4 w-4 mr-2" />
                Download {publication.fileFormat}
              </Button>
            </CardContent>
          </Card>

          {/* Back Button at Bottom */}
          <div className="mt-8 text-center">
            <Button onClick={handleBack} data-testid="button-back-bottom">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Publications
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}