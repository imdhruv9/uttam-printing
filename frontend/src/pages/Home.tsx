import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { LandingPage } from '../components/LandingPage';

/**
 * Home page with landing page and product listing
 */
export const Home: React.FC = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll({}),
  });

  return (
    <>
      {/* Landing Page Sections */}
      <LandingPage />

      {/* Products Section */}
      <section id="products" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Browse Our <span className="text-primary">Complete Product Range</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Explore our full catalog with detailed pricing and specifications
            </p>
          </div>

          {/* Loading & Error States */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          )}

          {error && (
            <div className="flex justify-center py-12">
              <ErrorMessage message="Failed to load products" onRetry={() => refetch()} />
            </div>
          )}

          {/* Products Grid */}
          {data && data.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {data && data.length === 0 && (
            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
              <p className="text-gray-600">No products available at the moment.</p>
              <p className="mt-2 text-sm text-gray-500">
                Please check back soon or contact us for custom orders.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
