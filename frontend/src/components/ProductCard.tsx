import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice, getImageUrl, truncateText, formatCategoryName, getPricingUnit } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

/**
 * Product card component for displaying product in grid
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryImage = product.images.length > 0 ? product.images[0] : null;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {primaryImage ? (
          <img
            src={getImageUrl(primaryImage.url)}
            alt={primaryImage.altText || product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <svg
              className="h-24 w-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="No image available"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.negotiable && (
            <span className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-white shadow">
              Open to Bargain
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral">
          {formatCategoryName(product.category)}
        </p>

        {/* Product Name */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-3 text-sm text-gray-600">{truncateText(product.description, 100)}</p>

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.pricePerSqft)}
            </span>
            <span className="ml-1 text-sm text-gray-600">/ {getPricingUnit(product.category)}</span>
          </div>

          <span className="text-sm font-medium text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

