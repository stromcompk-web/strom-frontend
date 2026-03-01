import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";
import { Link } from "react-router-dom";

const TrackOrderPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Track Your Order
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">
              Once your order is placed, we'll keep you updated at every step. Here's how to stay in the loop.
            </p>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Order Confirmation</h2>
              <p>
                Right after you place an order, you'll receive an email at the address you provided. This confirmation includes your <strong className="text-foreground">Order ID</strong>. Keep this email handy—you'll need the Order ID if you contact us about your delivery.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Delivery Updates</h2>
              <p>
                When your order is shipped, we'll send you another email with tracking information and an estimated delivery date. You can use the details in that email to follow your parcel's journey.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Need Help?</h2>
              <p>
                If you haven't received a confirmation, or if you have questions about your order status, get in touch with our team. Have your Order ID and email address ready so we can assist you quickly.
              </p>
            </div>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
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

export default TrackOrderPage;
