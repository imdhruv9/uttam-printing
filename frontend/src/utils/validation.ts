import { z } from 'zod';
import { ProductCategory } from '../types';

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  username: z.string().email('Must be a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Must be a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[0-9]{10,20}$/, 'Phone number must be valid')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must not exceed 2000 characters'),
  productId: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Product form validation schema
 */
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(150, 'Name must not exceed 150 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must not exceed 2000 characters'),
  category: z.nativeEnum(ProductCategory, {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  pricePerSqft: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero')
    .max(999999.99, 'Price is too large'),
  negotiable: z.boolean().default(true),
  images: z
    .array(
      z.object({
        url: z.string().min(1, 'Image URL is required'),
        altText: z.string().optional(),
        ordering: z.number().default(0),
      })
    )
    .min(1, 'At least one image is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;

/**
 * Price calculator validation schema
 */
export const priceCalculatorSchema = z.object({
  width: z.number().positive('Width must be greater than zero').max(10000, 'Width is too large'),
  height: z.number().positive('Height must be greater than zero').max(10000, 'Height is too large'),
});

export type PriceCalculatorFormData = z.infer<typeof priceCalculatorSchema>;

