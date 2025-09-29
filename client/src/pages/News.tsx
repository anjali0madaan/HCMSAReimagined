import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";

export default function News() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  // Fetch all published news from database
  const { data: newsData, isLoading } = useQuery<News[]>({
    queryKey: ['/api/cms/news'],
    select: (data) => data?.filter(article => article.published) || []
  });

  // Transform news data for display using real UUIDs
  const allNews = newsData?.map((article) => ({
    id: article.id, // Use real UUID from database
    title: article.title,
    excerpt: article.excerpt || "",
    date: article.date_created ? new Date(article.date_created).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "No date",
    category: "News"
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
              All News
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest news, announcements, and updates from the 
              Haryana Civil Medical Services Association.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading news...</p>
            </div>
          )}

          {/* News Grid */}
          {!isLoading && (
            <>
              {allNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allNews.map((article) => (
                    <NewsCard key={article.id} {...article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No published news available at this time.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon for the latest updates and announcements.</p>
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