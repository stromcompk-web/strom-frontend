import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground font-display text-xs px-2 py-1 uppercase tracking-wider">
            {discountPercent}% Off
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-display text-sm uppercase tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
