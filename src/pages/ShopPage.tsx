import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const genderLabels: Record<string, string> = {
  men: "Men's Collection",
  women: "Women's Collection",
  kids: "Kids' Collection",
  sale: "Sale",
  "new-in": "New Arrivals",
};

const ShopPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get("q")?.trim().toLowerCase() || "";
  const gender = category || "";
  const { products, isLoading } = useProducts();

  let filtered =
    gender === "sale"
      ? products.filter((p) => p.originalPrice && p.originalPrice > p.price)
      : gender === "new-in"
      ? products
      : gender && ["men", "women", "kids"].includes(gender)
      ? products.filter((p) => p.gender === gender)
      : products;

  if (searchQ) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQ) ||
        p.category.toLowerCase().includes(searchQ) ||
        p.gender.toLowerCase().includes(searchQ) ||
        p.description.toLowerCase().includes(searchQ)
    );
  }

  const title = searchQ
    ? `Search: "${searchParams.get("q")}"`
    : genderLabels[gender] || "All Products";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb / Title Banner */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-body">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="container py-10 md:py-14">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-20">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
