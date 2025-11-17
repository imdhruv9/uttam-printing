import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit, Trash2, BarChart3 } from 'lucide-react';
import { productsApi, adminProductsApi } from '../services/api';
import { productSchema, type ProductFormData } from '../utils/validation';
import { ProductCategory, type Product } from '../types';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { ImageUploader } from '../components/ImageUploader';
import { Loading } from '../components/Loading';
import { formatPrice, getImageUrl, formatCategoryName, getErrorMessage, getPricingUnit } from '../utils/helpers';

/**
 * Admin panel for product management
 */
export const Admin: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productsApi.getAll({}),
  });

  // Fetch analytics
  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: adminProductsApi.getAnalytics,
    enabled: showAnalytics,
  });

  const { data: totalCount } = useQuery({
    queryKey: ['total-count'],
    queryFn: adminProductsApi.getTotalCount,
    enabled: showAnalytics,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: adminProductsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) =>
      adminProductsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
      setEditingProduct(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminProductsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      negotiable: true,
      images: [],
    },
  });

  const images = watch('images') || [];
  const selectedCategory = watch('category');

  // Handlers
  const handleOpenCreate = () => {
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      category: ProductCategory.FLEX_PRINTING,
      pricePerSqft: 0,
      negotiable: true,
      images: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      category: product.category,
      pricePerSqft: product.pricePerSqft,
      negotiable: product.negotiable,
      images: product.images.map((img) => ({
        url: img.url,
        altText: img.altText,
        ordering: img.ordering,
      })),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleImageUpload = (url: string) => {
    const newImage = {
      url,
      altText: '',
      ordering: images.length,
    };
    setValue('images', [...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const currentMutation = editingProduct ? updateMutation : createMutation;

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-gray-600">Manage your products and view analytics</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {showAnalytics ? 'Hide' : 'Show'} Analytics
            </Button>
            <Button onClick={handleOpenCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Analytics */}
        {showAnalytics && analytics && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="mt-2 text-3xl font-bold text-primary">{totalCount || 0}</p>
            </div>
            {Object.entries(analytics).map(([category, count]) => (
              <div key={category} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-600">
                  {formatCategoryName(category as ProductCategory)}
                </p>
                <p className="mt-2 text-3xl font-bold text-primary">{count}</p>
              </div>
            ))}
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Negotiable
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products?.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {product.images.length > 0 ? (
                            <img
                              src={getImageUrl(product.images[0].url)}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-200"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {formatCategoryName(product.category)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(product.pricePerSqft)} / {getPricingUnit(product.category)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {product.negotiable ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="mr-3 text-primary transition-colors hover:text-primary-dark"
                      >
                        <Edit className="inline h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 transition-colors hover:text-red-800"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="inline h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products?.length === 0 && (
            <div className="py-12 text-center text-gray-600">
              No products yet. Click "Add Product" to create one.
            </div>
          )}
        </div>

        {/* Product Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
            reset();
          }}
          title={editingProduct ? 'Edit Product' : 'Create Product'}
          size="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {Object.values(ProductCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {formatCategoryName(cat)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="pricePerSqft" className="block text-sm font-medium text-gray-700">
                  Price per {selectedCategory ? getPricingUnit(selectedCategory) : 'unit'} *
                </label>
                <input
                  id="pricePerSqft"
                  type="number"
                  step="0.01"
                  {...register('pricePerSqft', { valueAsNumber: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={selectedCategory === ProductCategory.FLEX_PRINTING ? 'Price per sq ft' : 'Price per piece'}
                />
                {errors.pricePerSqft && (
                  <p className="mt-1 text-sm text-red-600">{errors.pricePerSqft.message}</p>
                )}
              </div>
            </div>

            {/* Negotiable */}
            <div className="flex items-center">
              <input
                id="negotiable"
                type="checkbox"
                {...register('negotiable')}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                Open to bargain
              </label>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Images * (At least one required)
              </label>
              <div className="mt-2 space-y-4">
                {/* Current Images */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={getImageUrl(image.url)}
                          alt={`Product ${index + 1}`}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload New Image */}
                <ImageUploader onUploadSuccess={handleImageUpload} />
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
              )}
            </div>

            {/* Error */}
            {currentMutation.isError && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {getErrorMessage(currentMutation.error)}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProduct(null);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={currentMutation.isPending}
                disabled={currentMutation.isPending}
              >
                {editingProduct ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

