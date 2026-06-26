import { cookies } from "next/headers";
import { createSupabaseServerClient, isSupabaseConfigured } from "./supabase";

export async function getUserStoreId(): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    // Return mock store id for dev mode
    return "store-001";
  }

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  if (!supabase) return null;

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("store_id")
    .eq("id", user.id)
    .single();

  return profile?.store_id || null;
}