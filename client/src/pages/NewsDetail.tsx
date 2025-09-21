import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";

export default function NewsDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const newsId = params.id;

  // Fetch single news article from database
  const { data: article, isLoading, error } = useQuery<News>({
    queryKey: ['/api/cms/news', newsId],
    enabled: !!newsId
  });

  const handleBack = () => {
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested news article could not be found.</p>
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
            Back to News
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">News</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="article-title">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-muted-foreground mb-6" data-testid="article-excerpt">
                {article.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span data-testid="article-date">
                  {new Date(article.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span data-testid="article-author">HCMSA</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span data-testid="article-read-time">5 min read</span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          {article.featured_image && (
            <div className="mb-8">
              <img 
                src={article.featured_image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-testid="article-image"
              />
            </div>
          )}

          {/* Article Content */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none" data-testid="article-content">
                <div className="whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Footer */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published by HCMSA on {new Date(article.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',  
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBack} data-testid="button-back-to-news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to News
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