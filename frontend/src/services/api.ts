import axios, { AxiosError, AxiosInstance } from 'axios';
import type {
  Product,
  ProductRequest,
  ContactRequest,
  LoginRequest,
  LoginResponse,
  FileUploadResponse,
  ProductAnalytics,
  ProductCategory,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add JWT token to requests if available
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Handle 401 errors by clearing token and redirecting to login
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// Authentication API
// ============================================================================

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): { username: string; roles: string[] } | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  hasRole: (role: string): boolean => {
    const user = authApi.getCurrentUser();
    return user?.roles.includes(role) || false;
  },
};

// ============================================================================
// Products API (Public)
// ============================================================================

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
}

export const productsApi = {
  getAll: async (filters: ProductFilters = {}): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());

    const response = await apiClient.get<Product[]>(`/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
};

// ============================================================================
// Contact API (Public)
// ============================================================================

export const contactApi = {
  submit: async (data: ContactRequest): Promise<void> => {
    await apiClient.post('/contact', data);
  },
};

// ============================================================================
// Admin Products API
// ============================================================================

export const adminProductsApi = {
  create: async (data: ProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>('/admin/products', data);
    return response.data;
  },

  update: async (id: string, data: ProductRequest): Promise<Product> => {
    const response = await apiClient.put<Product>(`/admin/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`);
  },

  getAnalytics: async (): Promise<ProductAnalytics> => {
    const response = await apiClient.get<ProductAnalytics>('/admin/products/analytics/by-category');
    return response.data;
  },

  getTotalCount: async (): Promise<number> => {
    const response = await apiClient.get<{ total: number }>('/admin/products/analytics/total');
    return response.data.total;
  },
};

// ============================================================================
// Media API
// ============================================================================

export const mediaApi = {
  upload: async (file: File): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<FileUploadResponse>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiClient;

