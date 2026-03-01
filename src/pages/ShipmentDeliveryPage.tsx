import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const ShipmentDeliveryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Shipment & Delivery
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">
              We deliver across Pakistan. Here’s what you need to know about shipping and delivery times.
            </p>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Delivery Areas</h2>
              <p>
                strom delivers to all major cities and towns across Pakistan. At checkout, enter your city and address to see whether we deliver to your area. Remote or restricted areas may have longer delivery times or additional charges—we'll inform you if that applies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Processing Time</h2>
              <p>
                Orders are processed within 1–3 business days after payment confirmation. During sale periods or high demand, processing may take a bit longer. We'll send you an email as soon as your order is shipped.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Delivery Time</h2>
              <p>
                Standard delivery usually takes 5–7 business days for main cities and 7–14 business days for other areas. These are estimates; actual delivery may vary depending on your location and courier availability.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Free Delivery</h2>
              <p>
                We offer free delivery on orders above Rs. 5,000. For orders below that amount, a nominal delivery charge will be shown at checkout. We may run limited-time free shipping promotions—check our website or social media for updates.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Contact</h2>
              <p>
                For delivery-related queries, reach us at strom.com.pk@gmail.com or +923034274270. Have your Order ID ready for faster assistance.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShipmentDeliveryPage;
