import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Support: [
    { label: "Track Your Order", href: "#" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipment & Delivery", href: "#" },
    { label: "Exchange Policy", href: "#" },
    { label: "How to Order", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Store Locator", href: "/stores" },
    { label: "Admin Panel", href: "/admin" },
    { label: "Privacy Policy", href: "#" },
    { label: "Work With Us", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog News", href: "#" },
  ],
};

const Footer = () => (
  <footer className="bg-footer text-footer-foreground">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="font-logo text-3xl uppercase tracking-tight text-primary mb-4 block">
            strom
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Pakistan's leading fashion brand offering premium quality clothing for Men, Women & Kids.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-footer-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-footer-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-footer-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary-foreground mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-primary-foreground mb-4">
            Connect With Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              +923034274270
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              strom.com.pk@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Mon–Fri 9:30 to 5:30
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-footer-foreground/10">
      <div className="container py-4 text-center text-xs text-footer-foreground/60">
        © {new Date().getFullYear()} strom. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
