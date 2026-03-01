import Header from "@/components/Header";
import Footer from "@/components/Footer";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const BlogNewsPage = () => {
  const placeholderPosts = [
    { title: "New Arrivals: Winter Collection 2025", date: "Coming soon", excerpt: "Stay tuned for our latest winter styles for men, women, and kids." },
    { title: "Fashion Tips & Styling Guides", date: "Coming soon", excerpt: "How to style strom pieces for every occasion." },
    { title: "Store Openings & Events", date: "Coming soon", excerpt: "New store launches and in-store events near you." },
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
              Blog & News
            </h1>
          </div>
        </section>

        <section className="container py-14 md:py-20 max-w-3xl mx-auto">
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            Latest updates, style inspiration, and news from strom. Check back soon for new posts.
          </p>
          <div className="space-y-8">
            {placeholderPosts.map((post, i) => (
              <article key={i} className="border-b border-border pb-8 last:border-0">
                <h2 className="font-display text-xl uppercase tracking-wider text-foreground mb-2">{post.title}</h2>
                <p className="text-xs text-muted-foreground mb-3">{post.date}</p>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogNewsPage;
