import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { productsApi } from "@/lib/api";

/** Products are always loaded from backend DB – no localStorage. Same data on every device. */
type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  isLoading: boolean;
  fetchError: string | null;
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
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const data = await productsApi.getAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load products";
      setFetchError(message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Product) => {
    await productsApi.create(product);
    await fetchProducts();
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id: string, product: Product) => {
    await productsApi.update(id, product);
    await fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    await productsApi.delete(id);
    await fetchProducts();
  }, [fetchProducts]);

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
        fetchError,
        refetch: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
