import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MoreHorizontal, Eye, Package } from "lucide-react";
import { useOrders } from "@/contexts/OrderContext";
import { formatPrice } from "@/data/products";
import type { Order, OrderStatus } from "@/lib/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import UpdateOrderStatusDialog from "@/components/admin/UpdateOrderStatusDialog";
import { toast } from "sonner";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  shipped: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const AdminOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updateStatusOrder, setUpdateStatusOrder] = useState<Order | null>(null);
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);

  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();

  const filtered = orders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  const handleViewDetails = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleUpdateStatusClick = (order: Order) => {
    setUpdateStatusOrder(order);
    setUpdateStatusOpen(true);
  };

  const handleStatusSave = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status updated");
      setUpdateStatusOpen(false);
      setUpdateStatusOrder(null);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Orders
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Manage and track all customer orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold text-primary">
              {formatPrice(totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription>
            {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.city}</TableCell>
                    <TableCell>{order.items.reduce((s, i) => s + i.quantity, 0)}</TableCell>
                    <TableCell className="font-display text-primary">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status]} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(order.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatusClick(order)}>
                            <Package className="h-4 w-4 mr-2" />
                            Update Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UpdateOrderStatusDialog
        order={updateStatusOrder}
        open={updateStatusOpen}
        onOpenChange={setUpdateStatusOpen}
        onSave={handleStatusSave}
      />
    </div>
  );
};

export default AdminOrders;
