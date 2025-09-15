import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import NewsCard from "@/components/NewsCard";
import LeadershipProfile from "@/components/LeadershipProfile";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, FileText, Award } from "lucide-react";
import maleDoctor from "@assets/generated_images/Male_doctor_portrait_7aebea1c.png";
import femaleDoctor from "@assets/generated_images/Female_doctor_portrait_2f72cef9.png";
import seniorDoctor from "@assets/generated_images/Senior_doctor_portrait_9fbac1bb.png";
import { newsArticles, events } from "@shared/data";

export default function Homepage() {
  // Use shared data and show only the first 4 items on homepage
  const latestNews = newsArticles.slice(0, 4).map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    date: new Date(article.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: article.category,
    isNew: article.isNew
  }));

  const leadership = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "President, HCMSA",
      image: seniorDoctor,
      bio: "Distinguished civil medical officer with over 25 years of experience in public health administration and medical services.",
      email: "president@hcmsa.gov.in",
      phone: "+91-172-2864241"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma", 
      designation: "Vice President",
      image: femaleDoctor,
      bio: "Accomplished medical professional specializing in community health and healthcare policy development for rural areas.",
      email: "vicepresident@hcmsa.gov.in",
      phone: "+91-172-2864242"
    },
    {
      id: 3,
      name: "Dr. Amit Singh",
      designation: "General Secretary",
      image: maleDoctor,
      bio: "Dedicated healthcare administrator focused on improving medical services and professional development opportunities for association members.",
      email: "secretary@hcmsa.gov.in",
      phone: "+91-172-2864243"
    }
  ];

  const upcomingEvents = events.slice(0, 3).map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: event.time,
    venue: event.venue,
    category: event.category,
    registrationOpen: event.registrationOpen,
    attendees: event.attendees
  }));

  const quickStats = [
    { icon: Users, label: "Active Members", value: "2,500+", testId: "stat-members" },
    { icon: Calendar, label: "Events This Year", value: "45", testId: "stat-events" },
    { icon: FileText, label: "Publications", value: "120+", testId: "stat-publications" },
    { icon: Award, label: "Years of Service", value: "58", testId: "stat-years" }
  ];

  const handleViewAllNews = () => {
    console.log("View all news clicked");
  };

  const handleViewAllEvents = () => {
    console.log("View all events clicked");
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
  };

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Quick Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold mb-1" data-testid={stat.testId}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About HCMSA Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" data-testid="section-about-title">
              About HCMSA
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="section-about-description">
              The Haryana Civil Medical Services Association (HCMSA) has been serving healthcare professionals 
              since 1966, dedicated to advancing medical services, promoting professional development, and 
              advocating for the welfare of civil medical officers throughout Haryana. Our association represents 
              over 2,500 medical professionals committed to excellence in public healthcare.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                asChild
                data-testid="button-join-membership"
              >
                <a href="https://portal.hscmsassociation.co.in" target="_blank" rel="noopener noreferrer">
                  Join Membership
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
                data-testid="button-member-services"
              >
                <a href="https://portal.hscmsassociation.co.in" target="_blank" rel="noopener noreferrer">
                  Member Services
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleQuickAction('contact')}
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" data-testid="section-news-title">
              Latest News & Announcements
            </h2>
            <Button 
              variant="outline"
              onClick={handleViewAllNews}
              data-testid="button-view-all-news"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-leadership-title">
              Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the distinguished medical professionals leading HCMSA towards excellence 
              in healthcare services and professional development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader) => (
              <LeadershipProfile key={leader.id} {...leader} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" data-testid="section-events-title">
              Upcoming Events
            </h2>
            <Button 
              variant="outline"
              onClick={handleViewAllEvents}
              data-testid="button-view-all-events"
            >
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="section-services-title">
            Member Services & Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
              <h3 className="font-semibold text-lg mb-3">Member Portal</h3>
              <p className="text-muted-foreground mb-4">
                Access your member dashboard, update profile, and manage membership details.
              </p>
              <Button 
                asChild
                data-testid="button-member-portal"
              >
                <a href="https://portal.hscmsassociation.co.in" target="_blank" rel="noopener noreferrer">
                  Access Portal
                </a>
              </Button>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
              <h3 className="font-semibold text-lg mb-3">CME Programs</h3>
              <p className="text-muted-foreground mb-4">
                Continuing Medical Education programs and certification courses for professionals.
              </p>
              <Button 
                onClick={() => handleQuickAction('cme-programs')}
                data-testid="button-cme-programs"
              >
                View Programs
              </Button>
            </div>
            <div id="publications" className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
              <h3 className="font-semibold text-lg mb-3">Publications</h3>
              <p className="text-muted-foreground mb-4">
                Download circulars, guidelines, forms, and other important documents.
              </p>
              <Button 
                onClick={() => handleQuickAction('publications')}
                data-testid="button-publications"
              >
                View Publications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-gallery-title">
              Photo Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore moments from our events, conferences, and activities that showcase the vibrant community of HCMSA.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for gallery images */}
            <div className="bg-card border border-card-border rounded-lg p-4 hover-elevate text-center">
              <div className="bg-muted rounded-lg h-32 mb-2 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Conference 2023</span>
              </div>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-4 hover-elevate text-center">
              <div className="bg-muted rounded-lg h-32 mb-2 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Training Session</span>
              </div>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-4 hover-elevate text-center">
              <div className="bg-muted rounded-lg h-32 mb-2 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Award Ceremony</span>
              </div>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-4 hover-elevate text-center">
              <div className="bg-muted rounded-lg h-32 mb-2 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Medical Camp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-contact-title">
              Contact Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with HCMSA for inquiries, support, or to learn more about our services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-card-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-lg mb-3">Head Office</h3>
              <p className="text-muted-foreground mb-2">
                HCMSA Headquarters<br/>
                Sector 6, Panchkula<br/>
                Haryana - 134109
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-lg mb-3">Phone & Email</h3>
              <p className="text-muted-foreground mb-2">
                Phone: +91-172-2864241<br/>
                Email: info@hcmsa.gov.in<br/>
                Fax: +91-172-2864242
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-lg mb-3">Office Hours</h3>
              <p className="text-muted-foreground mb-2">
                Monday - Friday: 9:00 AM - 5:00 PM<br/>
                Saturday: 9:00 AM - 1:00 PM<br/>
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}