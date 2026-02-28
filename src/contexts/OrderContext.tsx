import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { ordersApi, type Order, type OrderStatus } from "@/lib/api";

type OrderContextType = {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ordersApi.getAll();
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    await ordersApi.updateStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, getOrderById, isLoading, refetch: fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
