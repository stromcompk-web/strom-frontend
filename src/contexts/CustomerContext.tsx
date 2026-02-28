import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { customersApi, type Customer } from "@/lib/api";

type CustomerContextType = {
  customers: Customer[];
  isLoading: boolean;
  refetch: (search?: string) => Promise<void>;
};

const CustomerContext = createContext<CustomerContextType | null>(null);

export const useCustomers = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomers must be used within CustomerProvider");
  return ctx;
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = useCallback(async (search?: string) => {
    try {
      setIsLoading(true);
      const data = await customersApi.getAll(search);
      setCustomers(data);
    } catch {
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <CustomerContext.Provider value={{ customers, isLoading, refetch: fetchCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
