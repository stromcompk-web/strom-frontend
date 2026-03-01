import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { ordersApi, type Order, type OrderStatus } from "@/lib/api";

/** Orders are always loaded from backend DB – no localStorage. Same data on every device when admin is logged in. */
type OrderContextType = {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  isLoading: boolean;
  fetchError: string | null;
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
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const data = await ordersApi.getAll();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load orders";
      setFetchError(message);
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
    await fetchOrders();
  }, [fetchOrders]);

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, getOrderById, isLoading, fetchError, refetch: fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
