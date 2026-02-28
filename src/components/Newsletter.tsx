import { useState } from "react";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <img
        src={newsletterBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative container text-center">
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-primary-foreground mb-3">
          Stay In Touch
        </h2>
        <p className="text-primary-foreground/80 font-body text-sm mb-8 max-w-md mx-auto">
          Subscribe to our newsletter and be the first to know about new arrivals, sales & promos.
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            required
            className="flex-1 px-4 py-3 bg-background/90 text-foreground text-sm font-body outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
