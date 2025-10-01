import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} social link clicked`);
  };

  const quickLinks = [
    { name: "About HCMSA", href: "#about" },
    { name: "Membership", href: "#membership" },
    { name: "Events", href: "#events" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" }
  ];

  const memberServices = [
    { name: "Member Directory", href: "https://hcmsassociation.co.in", external: true },
    { name: "Professional Development", href: "https://hcmsassociation.co.in", external: true },
    { name: "CME Programs", href: "https://hcmsassociation.co.in", external: true },
    { name: "Welfare Schemes", href: "https://hcmsassociation.co.in", external: true },
    { name: "Grievance Portal", href: "https://hcmsassociation.co.in", external: true }
  ];

  const resources = [
    { name: "Publications", href: "#publications" },
    { name: "Circulars", href: "#circulars" },
    { name: "Forms & Downloads", href: "#downloads" },
    { name: "Guidelines", href: "#guidelines" },
    { name: "FAQ", href: "#faq" }
  ];

  return (
    <footer className="bg-muted/30 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Organization info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-md">
                  <span className="font-bold text-lg">HCMSA</span>
                </div>
                <span className="font-semibold">HCMSA</span>
              </div>
              <h3 className="font-semibold mb-3">Haryana Civil Medical Services Association</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dedicated to advancing healthcare services and supporting civil medical officers across Haryana since 1987.
              </p>
              
              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span data-testid="footer-address">Sector 6, Panchkula, Haryana 134109</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span data-testid="footer-phone">9646033033</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span data-testid="footer-email">support@hcmsassociation.co.in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                      asChild
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                      <a href={link.href}>{link.name}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Member Services */}
            <div>
              <h3 className="font-semibold mb-4">Member Services</h3>
              <ul className="space-y-2">
                {memberServices.map((service) => (
                  <li key={service.name}>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                      asChild
                      data-testid={`footer-service-${service.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                      <a 
                        href={service.href}
                        {...(service.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {service.name}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Resources */}
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for latest updates and announcements.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 mb-6">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="text-sm"
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="w-full"
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe
                </Button>
              </form>

              {/* Resources */}
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-1">
                {resources.slice(0, 3).map((resource) => (
                  <li key={resource.name}>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                      asChild
                      data-testid={`footer-resource-${resource.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    >
                      <a href={resource.href}>{resource.name}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2024 Haryana Civil Medical Services Association. All rights reserved.</p>
            </div>
            
            {/* Social media links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleSocialClick('Facebook')}
                  data-testid="button-social-facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleSocialClick('Twitter')}
                  data-testid="button-social-twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleSocialClick('LinkedIn')}
                  data-testid="button-social-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}