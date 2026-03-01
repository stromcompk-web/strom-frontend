import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { ordersApi } from "@/lib/api";
import { toast } from "sonner";

const SHIPPING = 250;
const FREE_SHIPPING_THRESHOLD = 5000;

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    city: "",
  });

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING;
  const orderTotal = totalPrice + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        customerName: form.customerName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color,
        })),
      };
      await ordersApi.create(payload);
      clearCart();
      toast.success("Order placed successfully! We'll contact you soon.");
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to place order.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !submitting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground font-body mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-10 md:py-14">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-secondary p-6">
                <h2 className="font-display text-lg uppercase tracking-wider mb-4">Contact &amp; Shipping</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
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
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                      placeholder="03XX XXXXXXX"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-display text-xs uppercase tracking-widest text-foreground mb-1.5 block">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background text-sm font-body text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                      placeholder="Lahore, Karachi, etc."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 sticky top-24">
                <h3 className="font-display text-lg uppercase tracking-wider mb-4">Order Summary</h3>
                <ul className="divide-y divide-border mb-4">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.size}-${item.color}`} className="py-3 flex justify-between text-sm">
                      <span className="font-body text-foreground">
                        {item.product.name} × {item.quantity}
                        <span className="text-muted-foreground ml-1">
                          ({item.size} / {item.color})
                        </span>
                      </span>
                      <span className="font-display text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 text-sm font-body border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice >= FREE_SHIPPING_THRESHOLD ? "Free" : formatPrice(SHIPPING)}</span>
                  </div>
                  <div className="flex justify-between font-display text-base pt-2">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="text-primary">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 py-4 bg-primary text-primary-foreground font-display uppercase text-sm tracking-widest hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Placing order…" : "Place Order"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
