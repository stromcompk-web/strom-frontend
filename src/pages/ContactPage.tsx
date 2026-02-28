import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Title */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-foreground">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-body">
              We'd love to hear from you
            </p>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-6">
                Get In Touch
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
                Have a question about your order, product availability, or anything else? Reach out to our customer support team and we'll be happy to help.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: "042-111-364-463" },
                  { icon: Mail, label: "Email", value: "online@engine.com.pk" },
                  { icon: Clock, label: "Working Hours", value: "Mon–Fri 9:30 AM to 5:30 PM" },
                  { icon: MapPin, label: "Head Office", value: "Lahore, Pakistan" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-display text-xs uppercase tracking-widest text-foreground">
                        {item.label}
                      </div>
                      <div className="font-body text-sm text-muted-foreground mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground font-display uppercase text-sm tracking-widest hover:bg-brand-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
