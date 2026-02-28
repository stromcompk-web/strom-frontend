export type ProductGender = "men" | "women" | "kids";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  gender: ProductGender;
  description: string;
  sizes: string[];
  colors: string[];
};

/**
 * Format a number as Pakistani Rupees (e.g. "Rs. 1,490").
 */
export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
