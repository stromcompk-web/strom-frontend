import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSale from "@/assets/hero-sale-banner.jpg";
import heroNew from "@/assets/hero-new-arrivals.jpg";

const slides = [
  { image: heroSale, alt: "End of Season Sale - Flat 50% Off" },
  { image: heroNew, alt: "New Arrivals" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full aspect-[16/7] md:aspect-[16/7] overflow-hidden bg-foreground">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/60 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/60 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 transition-colors ${
              i === current ? "bg-primary" : "bg-background/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
