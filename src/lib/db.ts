import type { Store, Category, MenuItem } from "@/types";
import { isSupabaseConfigured, createSupabaseServerClient } from "./supabase";

import storesData from "@/data/stores.json";
import categoriesData from "@/data/categories.json";
import itemsData from "@/data/items.json";

const mockStores: Store[] = storesData as Store[];
const mockCategories: Category[] = categoriesData as Category[];
const mockItems: MenuItem[] = itemsData as MenuItem[];

function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  // Server-side only - in client components, use createSupabaseBrowserClient
  const cookieStore = { get: (name: string) => ({ value: "" }) };
  return createSupabaseServerClient(cookieStore);
}

// Store operations
export async function getStores(): Promise<Store[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockStores.filter((s) => s.is_active);
  }

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error fetching stores:", error);
    return mockStores.filter((s) => s.is_active);
  }

  return data || [];
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockStores.find((s) => s.slug === slug && s.is_active) ?? null;
  }

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching store:", error);
    return null;
  }

  return data;
}

export async function getStoreById(id: string): Promise<Store | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockStores.find((s) => s.id === id && s.is_active) ?? null;
  }

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching store:", error);
    return null;
  }

  return data;
}

// Category operations
export async function getCategoriesByStore(storeId: string): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockCategories
      .filter((c) => c.store_id === storeId && c.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

// Item operations
export async function getItemsByStore(storeId: string): Promise<MenuItem[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockItems
      .filter((i) => i.store_id === storeId && i.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select(`
      *,
      modifier_groups (
        *,
        modifier_options (*)
      )
    `)
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    console.error("Error fetching items:", error);
    return [];
  }

  return (data || []) as MenuItem[];
}

export async function getItemsByCategory(storeId: string, categoryId: string): Promise<MenuItem[]> {
  const items = await getItemsByStore(storeId);
  return items.filter((i) => i.category_id === categoryId);
}

export async function getItemById(id: string): Promise<MenuItem | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return mockItems.find((i) => i.id === id && i.is_active) ?? null;
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select(`
      *,
      modifier_groups (
        *,
        modifier_options (*)
      )
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching item:", error);
    return null;
  }

  return data as MenuItem;
}

// Search
export async function searchItems(storeId: string, query: string): Promise<MenuItem[]> {
  const supabase = getSupabase();
  if (!supabase) {
    const q = query.toLowerCase();
    return getItemsByStore(storeId).then((items) =>
      items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    );
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select(`
      *,
      modifier_groups (
        *,
        modifier_options (*)
      )
    `)
    .eq("store_id", storeId)
    .eq("is_active", true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("display_order");

  if (error) {
    console.error("Error searching items:", error);
    return [];
  }

  return (data || []) as MenuItem[];
}

// Full menu data
export async function getFullMenu(storeId: string): Promise<{
  store: Store | null;
  categories: Category[];
  items: MenuItem[];
}> {
  const [store, categories, items] = await Promise.all([
    getStoreById(storeId),
    getCategoriesByStore(storeId),
    getItemsByStore(storeId),
  ]);

  return { store, categories, items };
}

// Order operations
export async function createOrder(order: {
  store_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_notes?: string;
  items: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    modifiers: string[];
    notes?: string;
  }>;
  total_amount: number;
  source: "whatsapp" | "web";
}): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) {
    console.log("Mock order created:", order);
    return "mock-order-id";
  }

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      store_id: order.store_id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_notes: order.customer_notes,
      total_amount: order.total_amount,
      source: order.source,
    })
    .select("id")
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    return null;
  }

  const orderItems = order.items.map((item) => ({
    order_id: orderData.id,
    item_id: item.item_id,
    item_name: item.item_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price,
    modifiers: item.modifiers,
    notes: item.notes,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    return null;
  }

  return orderData.id;
}

// Admin operations
export async function getOrdersByStore(
  storeId: string,
  status?: string
): Promise<Array<{
  id: string;
  store_id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_notes: string | null;
  total_amount: number;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
  items: Array<{
    id: string;
    item_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    modifiers: string[];
    notes: string | null;
  }>;
}>> {
  const supabase = getSupabase();
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return (data || []) as any[];
}

export async function updateOrderStatus(
  orderId: string,
  status: "received" | "preparing" | "ready" | "delivered" | "cancelled"
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order:", error);
    return false;
  }

  return true;
}