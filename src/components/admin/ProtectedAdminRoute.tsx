import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedAdminRouteProps = {
  children: React.ReactNode;
};

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
