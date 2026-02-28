import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

const itemKey = (id: string, size: string, color: string) => `${id}-${size}-${color}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, size: string, color: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.size === size && i.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
