import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project"));

export function createSupabaseBrowserClient() {
  if (!isConfigured) return null;
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export function createSupabaseServerClient(cookieStore?: { get: (name: string) => { value: string } | undefined }) {
  if (!isConfigured) return null;
  
  // For server components without cookies, create a basic client
  if (!cookieStore) {
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  // For middleware/routes with cookie access
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export function isSupabaseConfigured(): boolean {
  return isConfigured;
}