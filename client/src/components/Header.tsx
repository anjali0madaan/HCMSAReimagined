import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "#" },
    { name: "About HCMSA", href: "#about" },
    { name: "News", href: "#news" },
    { name: "Events", href: "#events" },
    { name: "Member Services", href: "#services" },
    { name: "Publications", href: "#publications" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

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
            <div className="bg-primary text-primary-foreground p-3 rounded-md">
              <span className="font-bold text-xl">HCMSA</span>
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
                asChild
                data-testid={`link-${item.name.toLowerCase().replace(/ /g, '-')}`}
              >
                <a href={item.href}>{item.name}</a>
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
                  asChild
                  className="justify-start"
                  data-testid={`mobile-link-${item.name.toLowerCase().replace(/ /g, '-')}`}
                >
                  <a href={item.href}>{item.name}</a>
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}