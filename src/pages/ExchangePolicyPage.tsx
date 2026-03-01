import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const ExchangePolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Exchange Policy
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">
              We want you to love your strom purchase. If the size or style isn’t right, you can exchange it as per the conditions below.
            </p>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Eligibility</h2>
              <p>
                Items must be unworn, unwashed, and in original condition with tags attached. Exchanges are accepted within 14 days of delivery. The product must be the same item (different size or colour only); we do not exchange for a different product—in that case, please return for a refund and place a new order.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">How to Exchange</h2>
              <p>
                Contact our customer care at strom.com.pk@gmail.com or +923034274270 with your Order ID and the size/variant you want. We'll guide you through the process. You may be asked to ship the item back to us; once we receive and verify it, we'll ship the replacement. In some areas, we can arrange a pickup for the return.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Defective or Wrong Item</h2>
              <p>
                If you received a defective product or the wrong item, we'll arrange a free exchange or full refund at no extra cost. Please report the issue within 48 hours of delivery with clear photos so we can resolve it quickly.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Non-Exchangeable Items</h2>
              <p>
                Sale or clearance items may have different exchange rules—please check the product page or ask at the time of purchase. Undergarments, unless defective, are generally not eligible for exchange for hygiene reasons.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Questions</h2>
              <p>
                For any exchange-related questions, email strom.com.pk@gmail.com or call +923034274270. We're here to help.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExchangePolicyPage;
