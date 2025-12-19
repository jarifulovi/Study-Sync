"use client";
import { AuthSubmitButton } from "@/components/ui/Buttons";
import { Input } from "@/components/ui/Inputs";
import { isValidEmail } from "@/utils/validation";
import { useState } from "react";

interface FieldErrors {
  email?: string;
}



export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
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
      const result = { success: true, error: null, data: null }; // Placeholder for actual API call
      if (!result.success) {
        setGeneralError(result.error || "Forgot password process failed. Please try again.");
      } else {
        console.log("Forgot password process successful:");
        // Show confirmation toast
      }

    } catch (submissionError) {
      setGeneralError("An error occurred during forgot password process. Please try again.");
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Forgot Your Password?</h1>
          <p className="text-sm text-gray-600">Enter your email address below and we'll send you a link to reset your password.</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">
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