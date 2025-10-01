import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import medicalBuildingImage from "@assets/generated_images/Medical_building_exterior_c7fc64c0.png";
import conferenceImage from "@assets/generated_images/Medical_conference_meeting_e0b527cc.png";
import emergencyDeptImage from "@assets/generated_images/Hospital_emergency_department_8e685018.png";

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSlider() {
  const slides: SlideData[] = [
    {
      id: 1,
      image: medicalBuildingImage,
      title: "HCMSA Headquarters",
      subtitle: "Serving Healthcare Excellence",
      description: "Official headquarters of Haryana Civil Medical Services Association, dedicated to advancing medical services across Haryana."
    },
    {
      id: 2,
      image: conferenceImage,
      title: "Annual Medical Conference 2024",
      subtitle: "Professional Development",
      description: "Join our annual conference featuring latest medical advances, professional development sessions, and networking opportunities."
    },
    {
      id: 3,
      image: emergencyDeptImage,
      title: "Emergency Medical Services",
      subtitle: "24/7 Healthcare Support",
      description: "Our members provide round-the-clock emergency medical care ensuring quality healthcare services across all civil hospitals."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    console.log("Slider navigated to slide:", index + 1);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    setCurrentSlide(next);
    console.log("Next slide:", next + 1);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prev);
    console.log("Previous slide:", prev + 1);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid={`slide-title-${slide.id}`}>
                  {slide.title}
                </h2>
                <h3 className="text-xl md:text-2xl mb-4 text-blue-200" data-testid={`slide-subtitle-${slide.id}`}>
                  {slide.subtitle}
                </h3>
                <p className="text-lg mb-6 text-gray-200" data-testid={`slide-description-${slide.id}`}>
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <a 
                    href="tel:9646033033" 
                    className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
                    data-testid="link-hero-phone"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-lg font-medium">9646033033</span>
                  </a>
                  <a 
                    href="mailto:support@hcmsassociation.co.in" 
                    className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
                    data-testid="link-hero-email"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-lg font-medium">support@hcmsassociation.co.in</span>
                  </a>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    size="lg" 
                    className="bg-white/20 backdrop-blur hover:bg-white/30 border border-white/30"
                    data-testid="button-learn-more"
                  >
                    Learn More
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10"
                    data-testid="button-join-hcmsa"
                  >
                    Join HCMSA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={prevSlide}
        data-testid="button-slider-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={nextSlide}
        data-testid="button-slider-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`slide-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}