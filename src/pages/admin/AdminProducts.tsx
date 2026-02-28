import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { formatPrice } from "@/data/products";
import type { Product } from "@/data/products";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import ViewProductSheet from "@/components/admin/ViewProductSheet";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";
import { toast } from "sonner";

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { products, deleteProduct: removeProduct } = useProducts();
  const navigate = useNavigate();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.gender.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (product: Product) => {
    setViewProduct(product);
    setViewSheetOpen(true);
  };

  const handleEdit = (product: Product) => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;
    setDeleteLoading(true);
    try {
      await removeProduct(deleteProduct.id);
      toast.success(`"${deleteProduct.name}" deleted successfully`);
      setDeleteProduct(null);
      setDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button className="w-fit" onClick={() => navigate("/admin/products/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, category, or gender..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <CardDescription>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => {
                  const hasDiscount =
                    product.originalPrice && product.originalPrice > product.price;
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-18 object-cover bg-secondary shrink-0"
                          />
                          <div>
                            <Link
                              to={`/product/${product.id}`}
                              target="_blank"
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {product.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{formatPrice(product.price)}</span>
                          {hasDiscount && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice!)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={hasDiscount ? "default" : "secondary"}>
                          {hasDiscount ? "On Sale" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(product)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteClick(product)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ViewProductSheet
        product={viewProduct}
        open={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
      />

      <DeleteProductDialog
        productName={deleteProduct?.name ?? ""}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminProducts;
