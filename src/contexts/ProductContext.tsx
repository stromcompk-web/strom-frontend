import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { productsApi } from "@/lib/api";

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Product) => {
    const created = await productsApi.create(product);
    setProducts((prev) => [...prev, created]);
    // Refetch so list is from DB and Network tab shows GET /products
    await fetchProducts();
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id: string, product: Product) => {
    await productsApi.update(id, product);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? product : p))
    );
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await productsApi.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        isLoading,
        refetch: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
