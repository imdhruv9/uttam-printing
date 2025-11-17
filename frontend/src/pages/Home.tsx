import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

/**
 * Home page with product listing
 */
export const Home: React.FC = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll({}),
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load products" onRetry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">
            Browse our wide selection of professional printing services
          </p>
        </div>

        {/* Products Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

