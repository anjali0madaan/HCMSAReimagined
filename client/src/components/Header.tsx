import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import hcmsaLogo from "@assets/hcmsa logo_1758028839137.jpeg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", sectionId: "" },
    { name: "About", sectionId: "about" },
    { name: "News", sectionId: "news" },
    { name: "Events", sectionId: "events" },
    { name: "Publications", sectionId: "publications" },
    { name: "Gallery", sectionId: "gallery" },
    { name: "Contact", sectionId: "contact" },
  ];

  const handleNavigation = (sectionId: string) => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
    
    if (sectionId === "") {
      // Home - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Section - scroll with header offset
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 100; // Account for sticky header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white dark:bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border/50">
          <div className="hidden md:flex items-center space-x-6">
            <span>Email: info@hcmsa.gov.in</span>
            <span>Phone: +91-172-2864241</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" data-testid="button-search">
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              data-testid="button-member-login"
            >
              <a href="https://portal.hscmsassociation.co.in" target="_blank" rel="noopener noreferrer">
                <User className="h-4 w-4 mr-2" />
                Member Login
              </a>
            </Button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img 
                src={hcmsaLogo} 
                alt="HCMSA Logo" 
                className="h-12 w-auto"
                data-testid="hcmsa-logo"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">
                Haryana Civil Medical Services Association
              </h1>
              <p className="text-sm text-muted-foreground">
                Serving Healthcare Professionals Since 1966
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleNavigation(item.sectionId)}
                data-testid={`link-${item.name.toLowerCase().replace(/ /g, '-')}`}
              >
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => handleNavigation(item.sectionId)}
                  className="justify-start"
                  data-testid={`mobile-link-${item.name.toLowerCase().replace(/ /g, '-')}`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}