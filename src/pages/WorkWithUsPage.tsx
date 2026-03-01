import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";
import { Link } from "react-router-dom";

const WorkWithUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              Work With Us
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Join the strom Family</h2>
              <p>
                strom is always looking for passionate people to join our team. Whether you're interested in retail, design, marketing, or operations, we offer opportunities to grow with Pakistan's leading fashion brand.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Open Roles</h2>
              <p>
                We hire for store staff, visual merchandising, e-commerce, customer support, and head office roles. Positions are posted as they become available. Follow our social media and check back here for updates.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">How to Apply</h2>
              <p>
                Send your CV and a short cover letter to strom.com.pk@gmail.com with the subject line "Career – [Role you're interested in]". For store positions, you can also visit any strom store and ask for an application form.
              </p>
            </div>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkWithUsPage;
