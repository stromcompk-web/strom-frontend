import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ReviewsShowcase from "@/components/ReviewsShowcase";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <CategoryGrid />
        <ReviewsShowcase />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
