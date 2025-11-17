import { ProductCategory } from '../types';

/**
 * Format price as currency
 */
export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

/**
 * Format category name for display
 */
export const formatCategoryName = (category: ProductCategory): string => {
  const categoryNames: Record<ProductCategory, string> = {
    [ProductCategory.FLEX_PRINTING]: 'Flex Printing',
    [ProductCategory.PAMPHLET]: 'Pamphlet',
  };
  return categoryNames[category] || category;
};

/**
 * Get pricing unit based on category
 */
export const getPricingUnit = (category: ProductCategory): string => {
  return category === ProductCategory.FLEX_PRINTING ? 'sq ft' : 'piece';
};

/**
 * Calculate area in square feet from dimensions in feet
 */
export const calculateSqFt = (widthFeet: number, heightFeet: number): number => {
  return widthFeet * heightFeet; // Direct multiplication since inputs are in feet
};

/**
 * Calculate total price based on dimensions in feet and price per sq ft
 */
export const calculateTotalPrice = (
  widthFeet: number,
  heightFeet: number,
  pricePerSqft: number
): number => {
  const sqFt = calculateSqFt(widthFeet, heightFeet);
  return sqFt * pricePerSqft;
};

/**
 * Get full image URL
 */
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path;
  }
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''}${path}`;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object') {
    const err = error as { response?: { data?: { message?: string; details?: string[] } } };
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.response?.data?.details && err.response.data.details.length > 0) {
      return err.response.data.details.join(', ');
    }
  }
  
  return 'An unexpected error occurred';
};

