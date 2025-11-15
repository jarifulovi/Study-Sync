"use client";

import { useState } from "react";
import Link from "next/link";
import { isValidEmail, isValidPassword, isValidText } from "@/utils/validation";
import { registerUser } from "@/services/apiService";
import { Input, PasswordInput } from "@/components/ui/Inputs";
import { AuthSubmitButton } from "@/components/ui/Buttons";

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    
    if (!isValidText(formData.firstName, 3, 50, false)) {
      errors.firstName = "First name must be 3-50 characters, no special characters";
    }
    
    if (!isValidText(formData.lastName, 3, 50, false)) {
      errors.lastName = "Last name must be 3-50 characters, no special characters";
    }
    
    if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!isValidPassword(formData.password)) {
      errors.password = "Password must be at least 8 characters long and include a number";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      const result = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setGeneralError(result.error || "Registration failed. Please try again.");
      } else {
        console.log("Registration successful:", result.data);
        // Handle successful registration (redirect, etc.)
      }

    } catch (submissionError) {
      setGeneralError("An error occurred during registration. Please try again.");
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-600">Join Study Sync and start collaborating</p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Field */}
            <Input
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              error={fieldErrors.firstName}
              placeholder="John"
              title="Enter your first name"
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              error={fieldErrors.lastName}
              placeholder="Doe"
              title="Enter your last name"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              placeholder="you@example.com"
              title="Enter your SS email"
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              placeholder="Create a strong password"
              title="Enter your password"
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={fieldErrors.confirmPassword}
              placeholder="Re-enter your password"
              title="Confirm your password"
            />

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                required
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the{" "}
                <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* General Error Display */}
            {generalError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600">{generalError}</p>
              </div>
            )}

            <AuthSubmitButton
              type="submit"
              label="Create Account"
              isLoading={isLoading}
            />
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs font-medium text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Sign in
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
