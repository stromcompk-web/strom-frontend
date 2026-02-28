import { Link } from "react-router-dom";
import { Star, Quote, MessageCircle } from "lucide-react";
import { useReviews } from "@/contexts/ReviewContext";
import { getProductById } from "@/data/products";

const ReviewsShowcase = () => {
  const { getAllReviews } = useReviews();
  const reviews = getAllReviews().slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-secondary/50" id="customer-reviews">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-3 text-center">
          Customer Reviews
        </h2>
        <p className="text-muted-foreground font-body text-sm text-center mb-12 max-w-lg mx-auto">
          Real reviews from real customers. See why shoppers love us.
        </p>
        {reviews.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-8 px-6 bg-background border border-border rounded-sm">
            <MessageCircle className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
            <p className="font-body text-muted-foreground text-sm mb-2">
              No customer reviews yet.
            </p>
            <p className="font-body text-muted-foreground text-xs mb-6">
              Be the first to share your experience — leave a review on any product page.
            </p>
            <Link
              to="/shop"
              className="inline-block font-display text-xs uppercase tracking-wider text-primary hover:underline"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const product = getProductById(review.productId);
              return (
                <div
                  key={review.id}
                  className="bg-background border border-border p-6 flex flex-col"
                >
                  <Quote className="w-8 h-8 text-primary/40 mb-4" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-body text-sm font-medium text-foreground">{review.author}</p>
                  {product && (
                    <Link
                      to={`/product/${review.productId}`}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      {product.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsShowcase;
