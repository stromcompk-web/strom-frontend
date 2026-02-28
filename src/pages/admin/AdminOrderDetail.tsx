import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useOrders } from "@/contexts/OrderContext";
import { formatPrice } from "@/data/products";
import type { OrderStatus } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  shipped: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrders();
  const order = id ? getOrderById(id) : null;

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    try {
      await updateOrderStatus(order.id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (!order) {
    return (
      <div className="space-y-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/orders")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Order not found</p>
          <Button variant="link" onClick={() => navigate("/admin/orders")} className="mt-2">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/orders")}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            Order {order.id}
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <Badge className={statusColors[order.status]} variant="secondary">
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer & Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Customer Information
            </CardTitle>
            <CardDescription>Contact and delivery details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Update Status</p>
              <Select value={order.status} onValueChange={(v: OrderStatus) => handleStatusChange(v)}>
                <SelectTrigger className="w-full max-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Order Summary
            </CardTitle>
            <CardDescription>Items and total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="font-display text-2xl text-primary">{formatPrice(order.total)}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping calculated at checkout
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-wider">
            Order Items
          </CardTitle>
          <CardDescription>
            {order.items.length} item{order.items.length !== 1 ? "s" : ""} in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div
                key={`${item.productId}-${item.quantity}`}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-display text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-display text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrderDetail;
