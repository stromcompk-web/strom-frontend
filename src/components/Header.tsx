import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const SEARCH_DEBOUNCE_MS = 300;

const navLinks = [
  { label: "Sale", href: "/shop/sale" },
  { label: "New In", href: "/shop/new-in" },
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Kids", href: "/shop/kids" },
];

const AnnouncementBar = () => (
  <div className="bg-announcement text-announcement-foreground text-xs py-2 overflow-hidden">
    <div className="animate-slide-announcement whitespace-nowrap">
      Free Delivery for orders above Rs. 5,000 &nbsp;&nbsp;|&nbsp;&nbsp; End of Season Sale — Flat 50% Off on Everything &nbsp;&nbsp;|&nbsp;&nbsp; Free Delivery for orders above Rs. 5,000
    </div>
  </div>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCart, totalItems } = useCart();

  const isOnShop = location.pathname === "/shop" || location.pathname.startsWith("/shop/");

  // Sync URL with search as user types (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = searchQuery.trim();
    debounceRef.current = setTimeout(() => {
      if (isOnShop) {
        if (q) {
          setSearchParams({ q }, { replace: true });
        } else {
          const next = new URLSearchParams(searchParams);
          next.delete("q");
          setSearchParams(next, { replace: true });
        }
      } else if (q) {
        navigate(`/shop?q=${encodeURIComponent(q)}`, { replace: true });
      }
      debounceRef.current = null;
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  // When opening search from shop page, prefill from URL
  useEffect(() => {
    if (searchOpen && isOnShop) {
      const q = searchParams.get("q") ?? "";
      setSearchQuery(q);
    }
  }, [searchOpen, isOnShop]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container relative flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-initial">
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-display text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-logo text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary"
          >
            strom
          </Link>

          <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border border-border px-3 py-1.5 min-w-[140px] md:min-w-[180px] flex-1 md:flex-initial max-w-[200px] md:max-w-none"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm outline-none flex-1 min-w-0 font-body text-foreground placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  autoFocus
                  aria-label="Search products"
                />
                <button type="submit" aria-label="Submit search" className="shrink-0">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2">
                <Search className="w-5 h-5 text-foreground" />
              </button>
            )}
            <button onClick={openCart} aria-label="Cart" className="p-2 relative">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 font-display text-sm uppercase tracking-widest text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
