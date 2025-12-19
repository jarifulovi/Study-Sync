import { supabaseService } from "@/backend/lib/supabaseServer";
import { RegisterInput, ServiceResponse, Profile, Education } from "./types";




// After User authenticates
export async function createUserProfile(
  registerInput: RegisterInput,
  authUserId: string
): Promise<ServiceResponse<boolean>> {
  try {
    const { email, firstName, lastName } = registerInput;

    // Prepare initial profile data
    const profileData: Partial<Profile> = {
      id: authUserId, // use the auth user ID here
      name: `${firstName} ${lastName}`,
      email,
      avatar: null,
      bio: null,
      education: {
        university: "",
        major: "",
        year: "",
        location: "",
      } as Education,
      media_links: {},
      achievements: [],
      certificates: []
    };

    // Insert into profiles table
    const { data, error } = await supabaseService
      .from("profiles")
      .insert(profileData)
      .single(); // single returns one row

    if (error) {
      return {
        success: false,
        error: error.message,
        data: false
      };
    }

    return {
      success: true,
      message: "Profile created successfully",
      data: true
    };

  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Unknown error",
      data: false
    };
  }
}


export async function doesUserExists(email: string): Promise<ServiceResponse<boolean>> {
  try {
    const { data, error } = await supabaseService
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single(); // returns one row or null

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found for .single(), ignore this
      return {
        success: false,
        error: error.message,
        data: false
      };
    }

    const exists = !!data;

    return {
      success: true,
      data: exists,
      message: exists ? "User exists" : "User not found"
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Unknown error",
      data: false
    };
  }
}