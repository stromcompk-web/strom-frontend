import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  /** Persistent identifier for this browser/visitor (one review per visitor per product) */
  reviewerId: string;
};

const STORAGE_KEY = "dazzle-reviews";
const REVIEWER_ID_KEY = "dazzle-reviewer-id";

function getOrCreateReviewerId(): string {
  try {
    let id = localStorage.getItem(REVIEWER_ID_KEY);
    if (!id) {
      id = `rv-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem(REVIEWER_ID_KEY, id);
    }
    return id;
  } catch {
    return `rv-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

type ReviewContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt" | "reviewerId">) => void;
  deleteReview: (id: string) => void;
  getReviewsByProductId: (productId: string) => Review[];
  getAllReviews: () => Review[];
  /** True if the current visitor has already submitted a review for this product */
  hasReviewedProduct: (productId: string) => boolean;
};

const ReviewContext = createContext<ReviewContextType | null>(null);

const loadReviews = (): Review[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Review[];
      return parsed.map((r) => ({ ...r, reviewerId: r.reviewerId ?? r.id }));
    }
  } catch {
    // ignore
  }
  return [];
};

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
};

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const reviewerId = getOrCreateReviewerId();

  const addReview = useCallback((review: Omit<Review, "id" | "createdAt" | "reviewerId">) => {
    const id = `rev-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newReview: Review = {
      ...review,
      id,
      createdAt: new Date().toISOString(),
      reviewerId: getOrCreateReviewerId(),
    };
    setReviews((prev) => [...prev, newReview]);
  }, []);

  const hasReviewedProduct = useCallback(
    (productId: string) => {
      return reviews.some((r) => r.productId === productId && r.reviewerId === reviewerId);
    },
    [reviews, reviewerId]
  );

  const deleteReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const getReviewsByProductId = useCallback(
    (productId: string) =>
      reviews.filter((r) => r.productId === productId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [reviews]
  );

  const getAllReviews = useCallback(
    () => [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [reviews]
  );

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, deleteReview, getReviewsByProductId, getAllReviews, hasReviewedProduct }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
