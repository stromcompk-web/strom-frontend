import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";
import { Link } from "react-router-dom";

const HowToOrderPage = () => {
  const steps = [
    { title: "Browse & add to cart", text: "Explore our collections on the Shop page. Click on any product to see details and size guide, then choose your size and quantity and click Add to Cart." },
    { title: "Review your cart", text: "Open your cart (cart icon in the header) to review items, update quantities, or remove products. When you're ready, click Proceed to Checkout." },
    { title: "Enter delivery & contact details", text: "On the checkout page, enter your full name, phone number, email, and delivery address. Make sure the details are correct so we can reach you and deliver without delay." },
    { title: "Place order", text: "Review your order summary and total. Place your order—you'll receive an order confirmation by email. We'll process your order and send shipping updates to the email you provided." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              How to Order
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">
              Shopping at strom is simple. Follow these steps to place your order online.
            </p>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i}>
                  <h2 className="font-display text-xl uppercase tracking-wider text-foreground mb-2">
                    {i + 1}. {step.title}
                  </h2>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Need a size guide?</h2>
              <p>
                Not sure which size to pick? Check our <Link to="/size-guide" className="text-primary underline hover:no-underline">Size Guide</Link> for men's and women's measurements. If you're between sizes, we recommend ordering the larger size.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/shop" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Start Shopping
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowToOrderPage;
