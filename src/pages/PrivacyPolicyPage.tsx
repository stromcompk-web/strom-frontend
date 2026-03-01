import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Privacy Policy
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">Last updated: {new Date().toLocaleDateString("en-PK")}</p>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Information We Collect</h2>
              <p>
                When you shop with strom, we collect information you provide such as name, email, phone number, and delivery address. We use this to process orders, send updates, and improve your experience. Payment details are handled securely by our payment partners and are not stored on our servers.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">How We Use Your Data</h2>
              <p>
                We use your data to fulfill orders, communicate about shipments, respond to inquiries, and send promotional offers if you have opted in. We do not sell your personal information to third parties. We may share data only with service providers necessary to run our business (e.g. delivery partners).
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Cookies & Analytics</h2>
              <p>
                Our website may use cookies to remember your preferences and improve site performance. You can manage cookie settings in your browser. We may use analytics tools to understand how visitors use our site, in an aggregated and anonymous way.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. To do so, contact us at strom.com.pk@gmail.com or call +923034274270. We will respond within a reasonable time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
