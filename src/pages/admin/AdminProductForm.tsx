import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import type { Product } from "@/data/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const GENDERS: Product["gender"][] = ["men", "women", "kids"];
const CATEGORIES = [
  "Tops",
  "Outerwear",
  "Casual Shirts",
  "Trousers",
  "Blazers",
  "Dresses",
  "Sweaters",
  "Kids Collection",
];

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProducts();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    gender: "men" as Product["gender"],
    description: "",
    sizes: "",
    colors: "",
  });

  const product = id ? getProductById(id) : null;

  useEffect(() => {
    if (id && !product) {
      navigate("/admin/products");
    }
  }, [id, product, navigate]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : "",
        image: typeof product.image === "string" ? product.image : "",
        category: product.category,
        gender: product.gender,
        description: product.description,
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
      });
    }
  }, [product, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(form.price, 10);
    const originalPrice = form.originalPrice ? parseInt(form.originalPrice, 10) : undefined;

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (originalPrice !== undefined && (isNaN(originalPrice) || originalPrice <= price)) {
      toast.error("Original price must be greater than sale price");
      return;
    }

    const sizes = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const colors = form.colors.split(",").map((c) => c.trim()).filter(Boolean);

    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.category) {
      toast.error("Category is required");
      return;
    }
    if (!form.image.trim()) {
      toast.error("Image URL is required");
      return;
    }
    if (sizes.length === 0) {
      toast.error("At least one size is required");
      return;
    }
    if (colors.length === 0) {
      toast.error("At least one color is required");
      return;
    }

    const productData: Product = {
      id: product?.id ?? `p${Date.now()}`,
      name: form.name.trim(),
      price,
      originalPrice,
      image: form.image.trim(),
      category: form.category,
      gender: form.gender,
      description: form.description.trim(),
      sizes,
      colors,
    };

    try {
      if (isEdit) {
        await updateProduct(productData.id, productData);
        toast.success("Product updated successfully");
      } else {
        await addProduct(productData);
        toast.success("Product added successfully");
      }
      navigate("/admin/products");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
      if (import.meta.env.DEV && err instanceof Error) {
        console.error("Product save failed:", err.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            {isEdit ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            {isEdit ? "Update product details" : "Create a new product for your catalog"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Basic Information
            </CardTitle>
            <CardDescription>Name, category, and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Classic Cotton Tee"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Product description..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={form.gender} onValueChange={(v: Product["gender"]) => setForm({ ...form, gender: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g} value={g} className="capitalize">
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Pricing & Image
            </CardTitle>
            <CardDescription>Set price and product image URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs.) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="1490"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (Rs.) - Optional</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  min="1"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                  placeholder="2990"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty if not on sale
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://example.com/image.jpg or /path/to/image.jpg"
                required
              />
              {form.image && (
                <div className="mt-2 w-24 h-32 bg-secondary overflow-hidden rounded border">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Sizes & Colors
            </CardTitle>
            <CardDescription>Comma-separated values (e.g. S, M, L, XL)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes *</Label>
              <Input
                id="sizes"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                placeholder="S, M, L, XL, XXL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Colors *</Label>
              <Input
                id="colors"
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                placeholder="White, Black, Navy"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8">
          <Button type="submit">
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
