import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-10 md:py-14">
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-8">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
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
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Table Header (desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-border text-xs text-muted-foreground font-display uppercase tracking-widest">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <ul className="divide-y divide-border">
                  {items.map((item) => {
                    const key = `${item.product.id}-${item.size}-${item.color}`;
                    return (
                      <li key={key} className="py-5">
                        <div className="grid md:grid-cols-12 gap-4 items-center">
                          {/* Product info */}
                          <div className="md:col-span-6 flex gap-4">
                            <Link to={`/product/${item.product.id}`} className="shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-20 h-24 md:w-24 md:h-28 object-cover bg-secondary"
                              />
                            </Link>
                            <div>
                              <Link
                                to={`/product/${item.product.id}`}
                                className="font-display text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-xs text-muted-foreground mt-1">
                                Size: {item.size}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Color: {item.color}
                              </p>
                              <button
                                onClick={() => removeItem(item.product.id, item.size, item.color)}
                                className="mt-2 text-xs text-destructive hover:underline flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="md:col-span-2 text-center">
                            <span className="md:hidden text-xs text-muted-foreground mr-1">Price:</span>
                            <span className="font-body text-sm">{formatPrice(item.product.price)}</span>
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-2 flex justify-center">
                            <div className="inline-flex items-center border border-border">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 h-8 flex items-center justify-center text-sm border-x border-border">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="md:col-span-2 text-right">
                            <span className="md:hidden text-xs text-muted-foreground mr-1">Total:</span>
                            <span className="font-display text-sm text-primary">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex items-center justify-between mt-6">
                  <Link
                    to="/shop"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-sm text-destructive hover:underline font-body"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 sticky top-24">
                  <h3 className="font-display text-lg uppercase tracking-wider mb-6">
                    Order Summary
                  </h3>
                  <div className="space-y-3 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{totalPrice >= 5000 ? "Free" : formatPrice(250)}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-display text-base">
                      <span className="uppercase tracking-wider">Total</span>
                      <span className="text-primary">
                        {formatPrice(totalPrice + (totalPrice >= 5000 ? 0 : 250))}
                      </span>
                    </div>
                  </div>
                  {totalPrice < 5000 && (
                    <p className="text-xs text-muted-foreground mt-3 font-body">
                      Add {formatPrice(5000 - totalPrice)} more for free delivery!
                    </p>
                  )}
                  <button className="w-full mt-6 py-4 bg-primary text-primary-foreground font-display uppercase text-sm tracking-widest hover:bg-brand-dark transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
