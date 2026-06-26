import { createSupabaseBrowserClient } from "./supabase";

export async function signIn(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: { message: error.message } };
  }

  return { data, error: null };
}

export async function signUp(email: string, password: string, storeName: string, storeSlug: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: storeName,
      },
    },
  });

  if (authError) {
    return { error: { message: authError.message } };
  }

  if (!authData.user) {
    return { error: { message: "Failed to create user" } };
  }

  // 2. Create store
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .insert({
      name: storeName,
      slug: storeSlug,
      whatsapp: "",
      is_active: true,
    })
    .select("id")
    .single();

  if (storeError) {
    return { error: { message: `Failed to create store: ${storeError.message}` } };
  }

  // 3. Create user profile with store_id
  const { error: profileError } = await supabase
    .from("user_profiles")
    .insert({
      id: authData.user.id,
      email: email,
      name: storeName,
      store_id: store.id,
      role: "owner",
    });

  if (profileError) {
    return { error: { message: `Failed to create profile: ${profileError.message}` } };
  }

  return { data: authData, error: null };
}

export async function signOut() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) return null;

  return user;
}

export async function getUserProfile() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) return null;

  return profile;
}

export async function getSession() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) return null;

  return session;
}