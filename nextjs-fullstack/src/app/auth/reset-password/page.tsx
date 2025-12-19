"use client";
import { useState } from "react";
import Link from "next/link";
import { isValidPassword } from "@/utils/validation";
import { PasswordInput } from "@/components/ui/Inputs";
import { AuthSubmitButton } from "@/components/ui/Buttons";
import { useSearchParams } from "next/dist/client/components/navigation";


interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}


export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');

  if (!accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
            <p className="text-gray-600">The password reset link is missing or invalid. Please request a new link.</p>
            <div className="mt-6">
              <Link 
                href="/auth/forgot-password" 
                className="text-blue-600 hover:underline">
                Go to Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Validation function
  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    
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
      const result = { success: true, error : null, data: null }; // Placeholder for actual API call

      if (!result.success) {
        setGeneralError(result.error || "Reset password failed. Please try again.");
      } else {
        console.log("Reset password successful with token: ", accessToken);
        // Show confirmation toast
      }

    } catch (submissionError) {
      setGeneralError("An error occurred during reset password process. Please try again.");
    }
    setTimeout(() => setIsLoading(false), 1000); // Simulate network delay
    // setIsLoading(false);
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="text-sm text-gray-600">Enter your new password below to reset your password.</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <PasswordInput
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              placeholder="Create a strong password"
              title="Enter your new password"
            />
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={fieldErrors.confirmPassword}
              placeholder="Re-enter your new password"
              title="Confirm your new password"
            />

            {/* General Error Display */}
            {generalError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600">{generalError}</p>
              </div>
            )}

            <AuthSubmitButton
              type="submit"
              label="Send Reset Link"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}