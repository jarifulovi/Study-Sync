"use client";

import { useState } from "react";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "@/utils/validation";
import { loginUser } from "@/services/apiService";
import { Input, PasswordInput } from "@/components/ui/Inputs";
import { AuthSubmitButton } from "@/components/ui/Buttons";



interface FieldErrors {
  email?: string;
  password?: string;
}


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  // Validation function
  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    
    if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!isValidPassword(formData.password)) {
      errors.password = "Password must be at least 8 characters long and include a number";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setGeneralError(null);
    setFieldErrors({});
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Submit registration data to backend API
    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login API result:", result);
      if (!result.success) {
        console.log("Login failed with error:", result.error);
        setGeneralError(result.error || "Login failed. Please try again.");
      } else {
        console.log("Login successful:", result.data);
        // Handle successful login (redirect to main)
        // Store user session and profile data on a context
      }

    } catch (submissionError) {
      setGeneralError("An error occurred during login. Please try again.");
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: undefined,
      });
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30">
            <span className="text-2xl font-bold text-white">SS</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              placeholder="you@example.com"
              title="Enter you SS email"
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
            />

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* General Error Display */}
            {generalError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600">{generalError}</p>
              </div>
            )}

            <AuthSubmitButton
              type="submit"
              label="Sign In"
              isLoading={isLoading}
            />
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs font-medium text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
