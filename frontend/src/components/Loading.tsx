import React from 'react';

interface LoadingProps {
  message?: string;
}

/**
 * Loading spinner component
 */
export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

