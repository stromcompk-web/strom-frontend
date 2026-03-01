import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

const AUTH_STORAGE_KEY = "engine_admin_auth";
const TOKEN_STORAGE_KEY = "engine_admin_token";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }
    try {
      const { authApi } = await import("@/lib/api");
      await authApi.me();
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    const onLogout = () => {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(false);
    };
    window.addEventListener('auth:logout', onLogout);
    return () => window.removeEventListener('auth:logout', onLogout);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { authApi } = await import("@/lib/api");
      const res = await authApi.login(email, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, res.access_token);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Invalid email or password",
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const value: AuthContextType = { isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
