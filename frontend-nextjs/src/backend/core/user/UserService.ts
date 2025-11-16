import { supabaseService, supabaseClient } from "@/backend/lib/supabaseServer";
import { RegisterInput, LoginInput, LoginOutput, ServiceResponse } from "./types";

// This is the core user for backend
// Will consists all core logic related to backend
// Only access functions under shared

export async function createUserAuth(registerInput: RegisterInput): Promise<ServiceResponse<any>> {
  try {
    const { email, password, firstName, lastName } = registerInput;

    // 1️⃣ Create the user in Supabase Auth using Admin API
    const { data: userData, error } = await supabaseService.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm email
      user_metadata: {
        firstName,
        lastName
      }
    });

    if (error || !userData) {
      return {
        success: false,
        error: error?.message || "Failed to create user",
        data: null
      };
    }

    return {
      success: true,
      message: "User created successfully",
      data: userData // contains id, email, created_at, etc.
    };

  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Unknown error",
      data: null
    };
  }
}


export async function loginUser(loginInput: LoginInput): Promise<ServiceResponse<LoginOutput | null>> {
  try {
    const { email, password } = loginInput;

    // Sign in using Supabase Auth
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      return {
        success: false,
        error: error?.message || "Invalid credentials",
        data: null
      };
    }

    const user = data.user;

    // Optionally fetch profile
    const { data: profileData, error: profileError } = await supabaseService
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return {
        success: false,
        error: profileError.message,
        data: null
      };
    }

    // Return standard ServiceResponse
    return {
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        email: user.email || "",
        firstName: user.user_metadata?.firstName,
        lastName: user.user_metadata?.lastName,
        profile: profileData,
        session: data.session
      }
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Internal server error",
      data: null
    };
  }
}

export async function forgotPassword(email: string): Promise<ServiceResponse<null>> {
  try {
    // Send password reset email using Supabase Auth
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to send password reset email",
        data: null
      };
    }

    return {
      success: true,
      message: "Password reset email sent successfully",
      data: null
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Internal server error",
      data: null
    };
  }
}

export async function resetPassword(accessToken: string, refreshToken: string, newPassword: string): Promise<ServiceResponse<null>> {
  try {
    // First, verify the recovery token and establish a session
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError || !sessionData.session) {
      return {
        success: false,
        error: sessionError?.message || "Invalid or expired recovery token",
        data: null
      };
    }

    // Now update the user's password
    const { error: updateError } = await supabaseClient.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      return {
        success: false,
        error: updateError.message || "Failed to update password",
        data: null
      };
    }

    return {
      success: true,
      message: "Password reset successfully",
      data: null
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Internal server error",
      data: null
    };
  }
}

