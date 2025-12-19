import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY!

// This is supabase with admin access
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

// Create Supabase client for server-side operations (API routes)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);