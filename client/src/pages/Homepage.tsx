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

export default function Homepage() {
  // TODO: Remove mock data when implementing real backend
  const latestNews = [
    {
      id: 1,
      title: "HCMSA Annual General Meeting 2024 Scheduled",
      excerpt: "The annual general meeting will be held on March 15, 2024, at the HCMSA headquarters. All members are cordially invited to participate in the proceedings and contribute to the association's future direction.",
      date: "March 10, 2024",
      category: "Announcements",
      isNew: true
    },
    {
      id: 2,
      title: "New CME Program Launch for Continuing Medical Education", 
      excerpt: "HCMSA is proud to announce the launch of a comprehensive Continuing Medical Education program designed to enhance the professional development of our members.",
      date: "March 8, 2024",
      category: "Education"
    },
    {
      id: 3,
      title: "Health Department Policy Updates for Civil Medical Officers",
      excerpt: "Important policy updates have been released by the Haryana Health Department affecting promotion criteria and service conditions for all civil medical officers.",
      date: "March 5, 2024", 
      category: "Policy Updates"
    },
    {
      id: 4,
      title: "Medical Equipment Modernization Initiative Launched",
      excerpt: "A comprehensive initiative to upgrade medical equipment across all civil hospitals in Haryana has been announced by the health department.",
      date: "March 3, 2024",
      category: "Infrastructure"
    }
  ];

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

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Medical Conference 2024",
      description: "Join us for our flagship annual conference featuring keynote speakers, workshops, and networking opportunities for medical professionals.",
      date: "April 15-16, 2024",
      time: "9:00 AM - 5:00 PM",
      venue: "HCMSA Convention Center, Panchkula",
      category: "Conference",
      registrationOpen: true,
      attendees: 245
    },
    {
      id: 2,
      title: "CPR & Emergency Response Training",
      description: "Hands-on training session for CPR certification and emergency medical response techniques for healthcare professionals.",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM", 
      venue: "Civil Hospital, Sector 6",
      category: "Training",
      registrationOpen: true,
      attendees: 58
    },
    {
      id: 3,
      title: "Health Policy Discussion Forum",
      description: "Interactive discussion on recent health policy changes and their impact on civil medical services in Haryana.",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "HCMSA Auditorium", 
      category: "Forum",
      registrationOpen: false,
      attendees: 89
    }
  ];

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
    <div className="min-h-screen bg-background">
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
      <section className="py-16">
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
      <section className="py-16 bg-muted/30">
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
      <section className="py-16 bg-muted/30">
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
      <section className="py-16">
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
            <div className="bg-card border border-card-border rounded-lg p-6 hover-elevate">
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

      <Footer />
    </div>
  );
}