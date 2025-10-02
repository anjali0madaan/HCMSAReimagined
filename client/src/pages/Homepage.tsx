import { useState } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import NewsCard from "@/components/NewsCard";
import LeadershipProfile from "@/components/LeadershipProfile";
import EventCard from "@/components/EventCard";
import PublicationCard from "@/components/PublicationCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Users, Calendar, FileText, Award, X } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import maleDoctor from "@assets/generated_images/Male_doctor_portrait_7aebea1c.png";
import femaleDoctor from "@assets/generated_images/Female_doctor_portrait_2f72cef9.png";
import seniorDoctor from "@assets/generated_images/Senior_doctor_portrait_9fbac1bb.png";
import type { News, Event, Publication, Leadership } from "@shared/schema";

export default function Homepage() {
  const [, setLocation] = useLocation();
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<{
    title: string;
    description: string;
    image: string;
  } | null>(null);
  
  // Fetch latest news from database
  const { data: newsData, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ['/api/cms/news'],
    select: (data) => data?.filter(article => article.published).slice(0, 4) || []
  });

  // Fetch upcoming events from database
  const { data: eventsData, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ['/api/cms/events'],
    select: (data) => data?.filter(event => event.published).slice(0, 3) || []
  });

  // Fetch featured publications from database
  const { data: publicationsData, isLoading: publicationsLoading } = useQuery<Publication[]>({
    queryKey: ['/api/cms/publications'],
    select: (data) => data?.filter(pub => pub.published).slice(0, 3) || []
  });

  // Fetch leadership from database
  const { data: leadershipData, isLoading: leadershipLoading } = useQuery<Leadership[]>({
    queryKey: ['/api/cms/leadership'],
    select: (data) => data?.filter(leader => leader.active).slice(0, 3) || []
  });

  // Transform news data for display
  const latestNews = newsData?.map((article) => ({
    id: article.id, // Use real database UUID
    title: article.title,
    excerpt: article.excerpt || "",
    date: new Date(article.date_created).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: "News",
    isNew: false // Could calculate based on date_created
  })) || [];

  // Transform events data for display
  const upcomingEvents = eventsData?.map((event) => ({
    id: event.id, // Use real database UUID
    title: event.title,
    description: event.description,
    date: event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "TBD",
    time: event.event_date ? new Date(event.event_date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }) : "TBD",
    venue: event.location || "TBD",
    category: "Event",
    registrationOpen: true
  })) || [];

  // Transform leadership data for display
  const leadership = leadershipData?.map((leader, index) => ({
    id: index + 1, // Use numeric ID for component
    name: leader.name,
    designation: leader.position,
    image: leader.photo || seniorDoctor, // Use placeholder if no photo
    bio: leader.bio || "",
    email: leader.email || "",
    phone: leader.phone || ""
  })) || [];

  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      title: "Annual Medical Conference",
      description: "Healthcare professionals gathering for knowledge sharing and networking",
      image: seniorDoctor,
      category: "Conference 2024"
    },
    {
      id: 2,
      title: "Professional Development Workshop",
      description: "Skill enhancement sessions for medical professionals",
      image: maleDoctor,
      category: "Workshop 2024"
    },
    {
      id: 3,
      title: "Excellence Awards Ceremony",
      description: "Recognizing outstanding service and dedication in healthcare",
      image: femaleDoctor,
      category: "Awards 2024"
    }
  ];

  // Calculate dynamic stats from database data
  const quickStats = [
    { 
      icon: Users, 
      label: "Active Members", 
      value: leadershipData?.filter(l => l.active).length.toString() || "0", 
      testId: "stat-members" 
    },
    { 
      icon: Calendar, 
      label: "Events This Year", 
      value: eventsData?.filter(e => e.published).length.toString() || "0", 
      testId: "stat-events" 
    },
    { 
      icon: FileText, 
      label: "Publications", 
      value: publicationsData?.filter(p => p.published).length.toString() || "0", 
      testId: "stat-publications" 
    },
    { 
      icon: Award, 
      label: "Years of Service", 
      value: "38", 
      testId: "stat-years" 
    }
  ];

  // Get featured publications (already sliced in query)
  const featuredPublications = publicationsData?.map((pub) => ({
    id: pub.id, // Use real UUID from database
    title: pub.title,
    description: pub.description || "",
    category: pub.category,
    publishedDate: pub.publication_date ? new Date(pub.publication_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "Not specified",
    fileSize: "2.5 MB", // Default value
    fileFormat: "PDF", // Default value
    downloadUrl: pub.document_file || "#",
    department: "HCMSA",
    isNew: false,
    isImportant: false
  })) || [];
  
  const handleViewAllNews = () => {
    setLocation("/news");
  };

  const handleViewAllEvents = () => {
    setLocation("/events");
  };
  
  const handleViewAllPublications = () => {
    setLocation("/publications");
  };

  const handleQuickAction = (action: string) => {
    // Handle membership - redirect to external portal
    if (action === "membership") {
      const newWindow = window.open("https://hcmsassociation.co.in", "_blank");
      if (newWindow) newWindow.opener = null;
      return;
    }

    // For other actions, scroll to the corresponding section
    const sectionId = action; // events, publications, contact
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Show loading state if any data is still loading
  const isLoading = newsLoading || eventsLoading || publicationsLoading || leadershipLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      
      {/* Loading state */}
      {isLoading && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      )}

      {!isLoading && (
        <>

          {/* Leadership Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Meet the dedicated professionals leading the Haryana Civil Medical Services Association
                </p>
              </div>
              
              {leadership.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {leadership.map((leader) => (
                    <LeadershipProfile key={leader.id} {...leader} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No active leadership profiles available.</p>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">About HCMSA</h2>
                <div className="max-w-4xl mx-auto text-lg text-muted-foreground space-y-6">
                  <p>
                    The Haryana Civil Medical Services Association (HCMSA) is a professional organization dedicated to serving 
                    civil medical officers and healthcare professionals across Haryana state. Founded with the mission to advance 
                    healthcare excellence and professional development.
                  </p>
                  <p>
                    Our association represents the interests of civil medical officers, promotes continuing medical education, 
                    and works towards improving healthcare delivery systems throughout Haryana.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2" data-testid={stat.testId}>
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Latest News Section */}
          <section id="news" className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Latest News</h2>
                  <p className="text-muted-foreground">Stay informed with the latest updates and announcements</p>
                </div>
                <Button variant="outline" onClick={handleViewAllNews} data-testid="button-view-all-news">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {latestNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {latestNews.map((article) => (
                    <NewsCard key={article.id} {...article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No published news articles available.</p>
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section id="events" className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
                  <p className="text-muted-foreground">Join us for conferences, workshops, and professional development</p>
                </div>
                <Button variant="outline" onClick={handleViewAllEvents} data-testid="button-view-all-events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming events scheduled.</p>
                </div>
              )}
            </div>
          </section>

          {/* Featured Publications Section */}
          <section id="publications" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Publications</h2>
                  <p className="text-muted-foreground">Access guidelines, reports, and research publications</p>
                </div>
                <Button variant="outline" onClick={handleViewAllPublications} data-testid="button-view-all-publications">
                  View All Publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {featuredPublications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPublications.map((publication) => (
                    <PublicationCard key={publication.id} {...publication} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No featured publications available.</p>
                </div>
              )}
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Gallery</h2>
                <p className="text-lg text-muted-foreground">
                  Moments from our events, conferences, and association activities
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg overflow-hidden shadow-sm cursor-pointer hover-elevate transition-all"
                    onClick={() => setSelectedGalleryItem(item)}
                    data-testid={`gallery-item-${item.id}`}
                  >
                    <div className="aspect-video bg-muted/50 flex items-center justify-center overflow-hidden relative group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-semibold">Click to view</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold" data-testid={`gallery-title-${item.id}`}>{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Modal */}
          <Dialog open={!!selectedGalleryItem} onOpenChange={(open) => !open && setSelectedGalleryItem(null)}>
            <DialogContent className="max-w-4xl">
              {selectedGalleryItem && (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedGalleryItem.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={selectedGalleryItem.image}
                        alt={selectedGalleryItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-muted-foreground">{selectedGalleryItem.description}</p>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Contact Section */}
          <section id="contact" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="text-lg text-muted-foreground">
                  Get in touch with us for any queries or assistance
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Main Office</h3>
                  <p className="text-muted-foreground">
                    Civil Medical Services<br />
                    Haryana Government
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Contact Info</h3>
                  <p className="text-muted-foreground">
                    Phone: 9646033033<br />
                    Email: support@hcmsassociation.co.in<br />
                    Website: hcmsassociation.co.in
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Saturday<br />
                    9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Action Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
                <p className="text-lg text-muted-foreground">
                  Get quick access to important services and resources
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  size="lg" 
                  className="h-24 flex-col gap-2"
                  onClick={() => handleQuickAction("membership")}
                  data-testid="quick-action-membership"
                >
                  <Users className="h-6 w-6" />
                  Membership
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => handleQuickAction("events")}
                  data-testid="quick-action-events"
                >
                  <Calendar className="h-6 w-6" />
                  Register for Events
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => handleQuickAction("publications")}
                  data-testid="quick-action-publications"
                >
                  <FileText className="h-6 w-6" />
                  Download Publications
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => handleQuickAction("contact")}
                  data-testid="quick-action-contact"
                >
                  <Award className="h-6 w-6" />
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}