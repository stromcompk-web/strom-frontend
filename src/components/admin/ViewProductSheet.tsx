import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import type { Product } from "@/data/products";

type ViewProductSheetProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ViewProductSheet = ({ product, open, onOpenChange }: ViewProductSheetProps) => {
  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-xl uppercase tracking-wider">
            Product Details
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg uppercase tracking-wide text-foreground">
                {product.name}
              </h3>
              <Badge variant={hasDiscount ? "default" : "secondary"}>
                {hasDiscount ? `${discountPercent}% Off` : "Active"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">ID: {product.id}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Pricing
            </h4>
            <div className="flex items-center gap-3">
              <span className="font-display text-xl text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Description
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Category
              </h4>
              <p className="text-sm">{product.category}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Gender
              </h4>
              <Badge variant="secondary" className="capitalize">
                {product.gender}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Sizes
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 bg-secondary text-sm font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-secondary text-sm font-medium"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewProductSheet;
