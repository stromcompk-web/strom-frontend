const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  return localStorage.getItem('engine_admin_token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    const msg = err.message || `HTTP ${res.status}`;
    if (import.meta.env.DEV) {
      console.error('[API]', options.method || 'GET', url, res.status, msg);
    }
    throw new Error(msg);
  }
  return res.json();
}

/** Base URL used for API calls (for debugging / admin) */
export function getApiBase(): string {
  return API_BASE;
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ access_token: string; admin: { id: string; email: string } }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    ),
  me: () => api<{ id: string; email: string }>('/auth/me'),
};

export const productsApi = {
  getAll: (params?: { gender?: string; sale?: string; category?: string }) => {
    const q = new URLSearchParams();
    if (params?.gender) q.set('gender', params.gender);
    if (params?.sale) q.set('sale', params.sale);
    if (params?.category) q.set('category', params.category);
    const query = q.toString();
    return api<import('@/data/products').Product[]>(
      `/products${query ? `?${query}` : ''}`
    );
  },
  getById: (id: string) =>
    api<import('@/data/products').Product>(`/products/${id}`),
  create: (product: Omit<import('@/data/products').Product, 'id'> & { id?: string }) =>
    api<import('@/data/products').Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  update: (id: string, product: Partial<import('@/data/products').Product>) =>
    api<import('@/data/products').Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  delete: (id: string) =>
    api<void>(`/products/${id}`, { method: 'DELETE' }),
};

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = { productId: string; productName: string; quantity: number; price: number };

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  city: string;
};

export const ordersApi = {
  getAll: (status?: OrderStatus) =>
    api<Order[]>(`/orders${status ? `?status=${status}` : ''}`),
  getById: (id: string) => api<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: OrderStatus) =>
    api<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
};

export const customersApi = {
  getAll: (search?: string) =>
    api<Customer[]>(`/customers${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getById: (id: string) => api<Customer>(`/customers/${id}`),
};

/** Admin-only: push local DB to remote (MongoDB/Postgres) now */
export const syncApi = {
  pushToRemote: () =>
    api<{ ok: boolean; message: string }>('/sync/push', { method: 'POST' }),
};
