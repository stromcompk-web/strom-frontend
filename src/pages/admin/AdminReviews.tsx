import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Star, Trash2 } from "lucide-react";
import { useReviews } from "@/contexts/ReviewContext";
import { useProducts } from "@/contexts/ProductContext";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const StarRating = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
        }`}
      />
    ))}
  </div>
);

const AdminReviews = () => {
  const { getAllReviews, addReview, deleteReview } = useReviews();
  const { products, getProductById } = useProducts();
  const reviews = getAllReviews();

  const [search, setSearch] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [productId, setProductId] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const filtered = reviews.filter(
    (r) =>
      r.author.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      (getProductById(r.productId)?.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      toast.error("Please select a product");
      return;
    }
    if (!author.trim()) {
      toast.error("Please enter the customer name");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter the review comment");
      return;
    }
    try {
      await addReview({ productId, author: author.trim(), rating, comment: comment.trim() });
      toast.success("Review added successfully");
      setAddDialogOpen(false);
      setProductId("");
      setAuthor("");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add review");
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteReview(deleteId);
        toast.success("Review deleted");
        setDeleteId(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete review");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            Reviews
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            View and manage customer reviews. Add reviews on behalf of customers.
          </p>
        </div>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="font-display uppercase tracking-wider shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by author, product, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <CardDescription>
            {filtered.length} review{filtered.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No reviews yet. Add a review or wait for customers to submit.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <Link
                          to={`/product/${review.productId}`}
                          target="_blank"
                          className="text-primary hover:underline font-medium"
                        >
                          {getProductById(review.productId)?.name ?? review.productId}
                        </Link>
                      </TableCell>
                      <TableCell>{review.author}</TableCell>
                      <TableCell>
                        <StarRating value={review.rating} />
                      </TableCell>
                      <TableCell className="max-w-[280px] truncate text-muted-foreground">
                        {review.comment}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(review.id)}
                          aria-label="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Review Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display uppercase tracking-wider">
              Add Review
            </DialogTitle>
            <DialogDescription>
              Add a customer review on behalf of a customer. This will appear on the product page and homepage.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <Label>Product</Label>
              <Select value={productId} onValueChange={setProductId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Customer Name</Label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Review Comment</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write the review text..."
                rows={4}
                required
                className="resize-none"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-display uppercase tracking-wider">
                Add Review
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReviews;
