'use client';

import { useState } from 'react';


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
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
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
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:ring-2 ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-500/20"
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
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:ring-2 ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-500/20"
            }`}
            required={required}
          />
        )}
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
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
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
          className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition-all placeholder:text-gray-400 focus:ring-2 ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-500/20"
          }`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium"
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


