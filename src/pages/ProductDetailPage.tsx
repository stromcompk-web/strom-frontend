import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/data/products";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, getProductById } = useProducts();
  const product = getProductById(id || "");
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) document.title = `${product.name} – Strom`;
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl uppercase mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-primary underline font-body text-sm">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const related = (products || [])
    .filter((p) => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/shop/${product.gender}`} className="hover:text-primary transition-colors capitalize">
              {product.gender}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="container pb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="bg-secondary aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-2xl md:text-3xl uppercase tracking-wider text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <span className="font-display text-2xl text-primary">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-body">
                      {formatPrice(product.originalPrice!)}
                    </span>
                    <span className="bg-primary text-primary-foreground text-xs font-display px-2 py-0.5 uppercase tracking-wider">
                      {discountPercent}% Off
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground font-body text-sm leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Size */}
              <div className="mt-8">
                <label className="font-display text-xs uppercase tracking-widest text-foreground mb-3 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-10 px-3 border font-body text-sm transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mt-6">
                <label className="font-display text-xs uppercase tracking-widest text-foreground mb-3 block">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 px-4 border font-body text-sm transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <label className="font-display text-xs uppercase tracking-widest text-foreground mb-3 block">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-body text-sm border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="mt-8 w-full py-4 bg-primary text-primary-foreground font-display uppercase text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Extra info */}
              <div className="mt-8 space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>Category</span>
                  <span className="text-foreground">{product.category}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>Availability</span>
                  <span className="text-foreground">In Stock</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>Free Delivery</span>
                  <span className="text-foreground">Orders above Rs. 5,000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="container pb-16">
          <ReviewSection productId={product.id} />
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="bg-secondary py-12 md:py-16">
            <div className="container">
              <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-8 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
