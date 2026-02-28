import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { CustomerProvider } from "@/contexts/CustomerContext";
import CartDrawer from "@/components/CartDrawer";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <CartDrawer />}
      <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/stores" element={<StoreLocatorPage />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <OrderProvider>
                    <CustomerProvider>
                      <AdminLayout />
                    </CustomerProvider>
                  </OrderProvider>
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id/edit" element={<AdminProductForm />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ReviewProvider>
        <CartProvider>
        <ProductProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        </ProductProvider>
        </CartProvider>
        </ReviewProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
