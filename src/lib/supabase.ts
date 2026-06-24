import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// In dev mode with no Supabase, export a mock client
const isDev = !supabaseUrl || supabaseUrl.includes("your-project");

export const supabase = isDev
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !isDev;
}
