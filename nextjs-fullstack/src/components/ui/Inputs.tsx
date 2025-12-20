'use client';

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react';



// Helper component for field errors
const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-600">{error}</p>;
};


// Generic Input component
interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
  rows?: number;
}

export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = "Enter value",
  title = "Enter value",
  required = true,
  rows = 3
}: InputProps) {
  const isTextarea = type === 'textarea';

  return (
    <div className="relative">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            title={title}
            placeholder={placeholder}
            rows={rows}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 resize-none ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-300 bg-white focus:border-slate-400 focus:ring-slate-400/20"
            }`}
            required={required}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            title={title}
            placeholder={placeholder}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-300 bg-white focus:border-slate-400 focus:ring-slate-400/20"
            }`}
            required={required}
          />
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}



// Select component
interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  required = true
}: SelectProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 bg-white focus:border-slate-400 focus:ring-slate-400/20"
          }`}
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}



interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
}

export function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "Create a strong password",
  title = "Enter your SS password",
  required = true
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          title={title}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 bg-white focus:border-slate-400 focus:ring-slate-400/20"
          }`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm font-medium"
        >
          {showPassword ? (
            // Eye slash icon (hidden)
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            // Eye icon (visible)
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}




interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  error?: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxDimensions?: {
    width: number;
    height: number;
  };
  value?: File | null;
}

export function FileUpload({
  label,
  name,
  onChange,
  error,
  placeholder = "Click to upload or drag and drop",
  title = "SVG, PNG, JPG or GIF (MAX. 800x400px)",
  required = false,
  accept = ".svg,.png,.jpg,.jpeg,.gif",
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxDimensions = { width: 800, height: 400 },
  value = null
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file validation
  const validateFile = (file: File): boolean => {
    setValidationError(null);

    // Check file size
    if (file.size > maxSize) {
      setValidationError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return false;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setValidationError(`File type not supported. Accepted: ${accept}`);
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onChange(file);
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    } else {
      onChange(null);
      setPreviewUrl(null);
    }
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove file
  const handleRemoveFile = () => {
    onChange(null);
    setPreviewUrl(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-default mb-2">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <div
        className={`flex items-center justify-center w-full ${
          error || validationError ? 'border-danger' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={name}
          name={name}
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept={accept}
          className="hidden"
          required={required}
        />
        
        <label
          htmlFor={name}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary bg-primary/10'
              : error || validationError
              ? 'border-danger bg-danger/5'
              : 'border-default-strong bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium'
          }`}
        >
          {previewUrl ? (
            // Show preview when file is selected
            <div className="relative w-full h-full p-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain rounded"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile();
                }}
                className="absolute top-2 right-2 bg-danger text-black text-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-danger/80"
              >
                ×
              </button>
              <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-2 rounded">
                <p className="truncate">{value?.name}</p>
                <p>{(value?.size || 0) / 1024} KB</p>
              </div>
            </div>
          ) : (
            // Show upload prompt when no file
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm">
                <span className="font-semibold">{placeholder}</span>
              </p>
              <p className="text-xs">{title}</p>
              {maxDimensions && (
                <p className="text-xs mt-1">
                  Max dimensions: {maxDimensions.width}×{maxDimensions.height}px
                </p>
              )}
            </div>
          )}
        </label>
      </div>

      {/* Error messages */}
      {(error || validationError) && (
        <FieldError error={validationError || error} />
      )}

      {/* File info */}
      {value && !validationError && (
        <div className="mt-2 text-sm text-success">
          ✓ File selected: {value.name} ({(value.size / 1024).toFixed(1)} KB)
        </div>
      )}
    </div>
  );
}

