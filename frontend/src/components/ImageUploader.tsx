import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { mediaApi } from '../services/api';
import { Button } from './Button';
import { getErrorMessage } from '../utils/helpers';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  maxSize?: number; // in MB
}

/**
 * Image uploader component with preview
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  maxSize = 10,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const response = await mediaApi.upload(selectedFile);
      onUploadSuccess(response.url);
      setPreview(null);
      setSelectedFile(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      {!preview && (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-primary">
          <label className="flex cursor-pointer flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <span className="text-sm text-gray-600">Click to select image</span>
            <span className="text-xs text-gray-500">Max size: {maxSize}MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Select image file"
            />
          </label>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-64 w-full rounded-lg object-cover"
            />
            <button
              onClick={handleCancel}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={handleUpload}
            isLoading={uploading}
            disabled={uploading}
            className="w-full"
          >
            Upload Image
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

