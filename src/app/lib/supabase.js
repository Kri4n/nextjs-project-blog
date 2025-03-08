import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Supabase project URL from environment variables
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Supabase anon key for authentication

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
