import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-foreground/40 z-[60]" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[70] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({totalItems})
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-secondary transition-colors" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
              <p className="text-muted-foreground font-body text-sm">Your cart is empty!</p>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <Link
                  to="/shop/women"
                  onClick={closeCart}
                  className="block text-center px-6 py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors"
                >
                  Shop Women's
                </Link>
                <Link
                  to="/shop/men"
                  onClick={closeCart}
                  className="block text-center px-6 py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors"
                >
                  Shop Men's
                </Link>
                <Link
                  to="/shop/kids"
                  onClick={closeCart}
                  className="block text-center px-6 py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors"
                >
                  Shop Kids'
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 p-4">
                  <Link to={`/product/${item.product.id}`} onClick={closeCart} className="shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover bg-secondary"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={closeCart}
                      className="font-display text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.size} / {item.color}
                    </p>
                    <p className="font-display text-sm text-primary mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="w-7 h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm uppercase tracking-wider">Subtotal</span>
              <span className="font-display text-lg text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>
            <Link
              to="/cart"
              onClick={closeCart}
              className="block w-full text-center py-3 border border-foreground font-display uppercase text-sm tracking-wider hover:bg-secondary transition-colors"
            >
              View Cart
            </Link>
            <button className="w-full py-3 bg-primary text-primary-foreground font-display uppercase text-sm tracking-wider hover:bg-brand-dark transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
