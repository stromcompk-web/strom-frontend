import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src={newsletterBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container text-center">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider text-primary-foreground">
              About Us
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <div className="space-y-8 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Our Story</h2>
              <p>
                strom is Pakistan's leading fashion brand, dedicated to delivering premium quality clothing for Men, Women, and Kids. Established with a vision to redefine everyday fashion, we blend contemporary design with exceptional comfort and durability.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Our Mission</h2>
              <p>
                We believe that great style should be accessible to everyone. Our mission is to create clothing that empowers individuals to express themselves confidently, no matter the occasion. From casual streetwear to polished workwear, strom covers every facet of modern life.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Quality & Craftsmanship</h2>
              <p>
                Every piece in our collection is crafted from carefully selected fabrics and undergoes rigorous quality checks. We work with skilled artisans and modern manufacturing processes to ensure each garment meets our high standards of excellence.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-4">Nationwide Presence</h2>
              <p>
                With over 100+ stores across Pakistan and a seamless online shopping experience, strom brings fashion right to your doorstep. We offer free delivery on orders above Rs. 5,000 and a hassle-free exchange policy.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary py-14">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: "100+", label: "Stores" },
                { stat: "500K+", label: "Happy Customers" },
                { stat: "10K+", label: "Products" },
                { stat: "25+", label: "Years Experience" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-display text-3xl md:text-4xl text-primary">{item.stat}</div>
                  <div className="font-body text-sm text-muted-foreground mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
