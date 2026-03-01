import { useState } from "react";
import { Star } from "lucide-react";
import { useReviews } from "@/contexts/ReviewContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ReviewSectionProps = {
  productId: string;
};

const StarRating = ({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${
          size === "md" ? "w-5 h-5" : "w-4 h-4"
        } ${star <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
      />
    ))}
  </div>
);

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { getReviewsByProductId, addReview, hasReviewedProduct } = useReviews();
  const reviews = getReviewsByProductId(productId);
  const alreadyReviewed = hasReviewedProduct(productId);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }
    setSubmitting(true);
    try {
      await addReview({ productId, author: author.trim(), rating, comment: comment.trim() });
      setAuthor("");
      setRating(0);
      setComment("");
      toast.success("Thank you for your review!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="border-t border-border pt-12 mt-12">
      <h2 className="font-display text-xl uppercase tracking-wider text-foreground mb-6">
        Customer Reviews
      </h2>

      {/* Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <StarRating value={Math.round(avgRating * 2) / 2} size="md" />
          <span className="font-body text-sm text-muted-foreground">
            {avgRating > 0 ? avgRating.toFixed(1) : "—"} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      {/* Review form — hidden when this visitor already reviewed (one review per visitor per product) */}
      {alreadyReviewed ? (
        <div className="mb-10 py-6 px-4 bg-muted/50 border border-border max-w-lg rounded-sm">
          <p className="font-body text-sm text-muted-foreground">
            You have already submitted a review for this product. Only one review per customer is allowed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="font-display text-xs uppercase tracking-widest text-foreground mb-2 block">
                Your name
              </label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                className="font-body"
              />
            </div>
            <div>
              <label className="font-display text-xs uppercase tracking-widest text-foreground mb-2 block">
                Rating
              </label>
              <div
                className="flex gap-1"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    className="p-1 focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-display text-xs uppercase tracking-widest text-foreground mb-2 block">
                Your review
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={4}
                className="font-body resize-none"
              />
            </div>
            <Button type="submit" disabled={submitting} className="font-display uppercase tracking-wider">
              Submit Review
            </Button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-border pb-6 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-body font-medium text-foreground">{review.author}</span>
                <span className="text-xs text-muted-foreground font-body">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <StarRating value={review.rating} />
              <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
