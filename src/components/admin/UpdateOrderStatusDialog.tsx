import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Order, OrderStatus } from "@/lib/api";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

type UpdateOrderStatusDialogProps = {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (orderId: string, status: OrderStatus) => void | Promise<void>;
};

const UpdateOrderStatusDialog = ({
  order,
  open,
  onOpenChange,
  onSave,
}: UpdateOrderStatusDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">(
    order?.status ?? ""
  );

  useEffect(() => {
    if (order) setSelectedStatus(order.status);
  }, [order, open]);

  const handleOpenChange = (next: boolean) => {
    if (!next) setSelectedStatus(order?.status ?? "");
    onOpenChange(next);
  };

  const handleSave = async () => {
    if (!order || !selectedStatus) return;
    await onSave(order.id, selectedStatus as OrderStatus);
    handleOpenChange(false);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-lg uppercase tracking-wider">
            Update Order Status
          </DialogTitle>
          <DialogDescription>
            Change the status for order{" "}
            <span className="font-mono font-medium text-foreground">{order.id}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label className="text-sm">New Status</Label>
          <Select
            value={selectedStatus || order.status}
            onValueChange={(v: OrderStatus) => setSelectedStatus(v)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select status" />
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
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderStatusDialog;
