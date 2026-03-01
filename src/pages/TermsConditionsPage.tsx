import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Terms & Conditions
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <p className="text-foreground/90">Last updated: {new Date().toLocaleDateString("en-PK")}</p>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Use of Website</h2>
              <p>
                By using strom.com.pk, you agree to these terms. You must use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. You are responsible for keeping your account details and password confidential.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Orders & Payment</h2>
              <p>
                All orders are subject to availability and acceptance. We reserve the right to refuse or cancel orders in case of errors, fraud, or stock issues. Prices are in PKR and inclusive of applicable taxes unless stated otherwise. Payment is due at the time of order unless we agree otherwise.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Delivery & Returns</h2>
              <p>
                Delivery times are estimates and may vary. Risk of loss passes to you upon delivery. Our exchange and return policy is available on the website; please refer to it for eligibility and process. Defective or incorrect items will be replaced or refunded as per our policy.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content on this site—including logos, images, text, and design—is owned by strom or its licensors. You may not copy, modify, or use our content for commercial purposes without our written permission.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Contact</h2>
              <p>
                For questions about these terms, contact us at strom.com.pk@gmail.com or +923034274270.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
