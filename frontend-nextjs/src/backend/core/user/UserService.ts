import { supabaseService } from "@/backend/lib/supabaseServer";
import { RegisterInput, ServiceResponse, Profile, Education } from "./types";

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


