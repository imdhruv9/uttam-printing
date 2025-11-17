import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Calculator } from 'lucide-react';
import { productsApi } from '../services/api';
import { ProductCategory } from '../types';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/Button';
import {
  formatPrice,
  getImageUrl,
  formatCategoryName,
  calculateTotalPrice,
  getPricingUnit,
} from '../utils/helpers';

/**
 * Product detail page with image carousel and price calculator
 */
export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error || !product) return <ErrorMessage message="Product not found" />;

  const selectedImage =
    product.images.length > 0 ? product.images[selectedImageIndex] : null;
  const estimatedPrice =
    width > 0 && height > 0 ? calculateTotalPrice(width, height, product.pricePerSqft) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-primary transition-colors hover:text-primary-dark"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
              {selectedImage ? (
                <img
                  src={getImageUrl(selectedImage.url)}
                  alt={selectedImage.altText || product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <p>No image available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(image.url)}
                      alt={image.altText || `${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral">
                {formatCategoryName(product.category)}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
              {product.negotiable && (
                <span className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
                  Open to Bargain
                </span>
              )}
            </div>

            {/* Price */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600">
                Price per {getPricingUnit(product.category)}
              </p>
              <p className="mt-1 text-4xl font-bold text-primary">
                {formatPrice(product.pricePerSqft)}
                <span className="ml-2 text-lg font-normal text-gray-600">
                  / {getPricingUnit(product.category)}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-3 whitespace-pre-line text-gray-600">{product.description}</p>
            </div>

            {/* Price Calculator - Only for Flex Printing */}
            {product.category === ProductCategory.FLEX_PRINTING && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-gray-900">Price Calculator</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                        Width (feet)
                      </label>
                      <input
                        id="width"
                        type="number"
                        min="0"
                        step="0.1"
                        value={width || ''}
                        onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                        Height (feet)
                      </label>
                      <input
                        id="height"
                        type="number"
                        min="0"
                        step="0.1"
                        value={height || ''}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {estimatedPrice > 0 && (
                    <div className="rounded-lg bg-primary-light/10 p-4">
                      <p className="text-sm text-gray-600">Estimated Total</p>
                      <p className="mt-1 text-3xl font-bold text-primary">
                        {formatPrice(estimatedPrice)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Based on {(width * height).toFixed(2)} sq. ft
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <Link to={`/contact?product=${product.id}`}>
              <Button className="w-full" size="lg">
                Contact Us for This Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

