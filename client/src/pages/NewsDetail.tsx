import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsById } from "@shared/data";

export default function NewsDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const newsId = parseInt(params.id || "1", 10);
  const article = getNewsById(newsId);

  if (!article) {
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

  const handleBack = () => {
    setLocation("/");
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
            Back to News
          </Button>

          {/* Article Header */}
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" data-testid="news-category">
                  {article.category}
                </Badge>
                {article.isNew && (
                  <Badge variant="destructive">New</Badge>
                )}
              </div>
              
              <h1 
                className="text-3xl font-bold mb-4 text-foreground"
                data-testid="news-title"
              >
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span data-testid="news-date">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span data-testid="news-author">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span data-testid="news-read-time">{article.readTime}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-lg text-muted-foreground italic mb-6" data-testid="news-excerpt">
                  {article.excerpt}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-testid="news-content"
              />
            </CardContent>
          </Card>

          {/* Back Button at Bottom */}
          <div className="mt-8 text-center">
            <Button onClick={handleBack} data-testid="button-back-bottom">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}