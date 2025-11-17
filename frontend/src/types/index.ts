export enum ProductCategory {
  FLEX_PRINTING = 'FLEX_PRINTING',
  PAMPHLET = 'PAMPHLET',
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  ordering: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  pricePerSqft: number;
  negotiable: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  category: ProductCategory;
  pricePerSqft: number;
  negotiable: boolean;
  images: Omit<ProductImage, 'id'>[];
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

export interface User {
  username: string;
  roles: string[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: string[];
}

export interface ProductAnalytics {
  [key: string]: number;
}

