import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { reviewsApi, type Review } from "@/lib/api";

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

export type { Review };

type ReviewContextType = {
  reviews: Review[];
  isLoading: boolean;
  addReview: (review: Omit<Review, "id" | "createdAt" | "reviewerId">) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  getReviewsByProductId: (productId: string) => Review[];
  getAllReviews: () => Review[];
  hasReviewedProduct: (productId: string) => boolean;
  refetchReviews: () => Promise<void>;
};

const ReviewContext = createContext<ReviewContextType | null>(null);

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
};

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const reviewerId = getOrCreateReviewerId();

  const refetchReviews = useCallback(async () => {
    try {
      const data = await reviewsApi.getAll();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchReviews();
  }, [refetchReviews]);

  const addReview = useCallback(
    async (review: Omit<Review, "id" | "createdAt" | "reviewerId">) => {
      const created = await reviewsApi.create({
        ...review,
        reviewerId: getOrCreateReviewerId(),
      });
      setReviews((prev) => [...prev, created]);
    },
    []
  );

  const hasReviewedProduct = useCallback(
    (productId: string) => {
      return reviews.some((r) => r.productId === productId && r.reviewerId === reviewerId);
    },
    [reviews, reviewerId]
  );

  const deleteReview = useCallback(async (id: string) => {
    await reviewsApi.delete(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const getReviewsByProductId = useCallback(
    (productId: string) =>
      reviews
        .filter((r) => r.productId === productId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [reviews]
  );

  const getAllReviews = useCallback(
    () =>
      [...reviews].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [reviews]
  );

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        isLoading,
        addReview,
        deleteReview,
        getReviewsByProductId,
        getAllReviews,
        hasReviewedProduct,
        refetchReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
