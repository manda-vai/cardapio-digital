import type { Store, Category, MenuItem } from "@/types";

// Synchronous data loader for client components
// In production, this would be replaced with Supabase queries

import storesData from "@/data/stores.json";
import categoriesData from "@/data/categories.json";
import itemsData from "@/data/items.json";

const stores: Store[] = storesData as Store[];
const categories: Category[] = categoriesData as Category[];
const items: MenuItem[] = itemsData as MenuItem[];

// Store operations
export function getStores(): Store[] {
  return stores.filter((s) => s.is_active);
}

export function getStoreBySlug(slug: string): Store | null {
  return stores.find((s) => s.slug === slug && s.is_active) ?? null;
}

export function getStoreById(id: string): Store | null {
  return stores.find((s) => s.id === id && s.is_active) ?? null;
}

// Category operations
export function getCategoriesByStore(storeId: string): Category[] {
  return categories
    .filter((c) => c.store_id === storeId && c.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

// Item operations
export function getItemsByStore(storeId: string): MenuItem[] {
  return items
    .filter((i) => i.store_id === storeId && i.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

export function getItemsByCategory(storeId: string, categoryId: string): MenuItem[] {
  return getItemsByStore(storeId).filter((i) => i.category_id === categoryId);
}

export function getItemById(id: string): MenuItem | null {
  return items.find((i) => i.id === id && i.is_active) ?? null;
}

// Search
export function searchItems(storeId: string, query: string): MenuItem[] {
  const q = query.toLowerCase();
  return getItemsByStore(storeId).filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
  );
}

// Full menu data
export function getFullMenu(storeId: string): {
  store: Store | null;
  categories: Category[];
  items: MenuItem[];
} {
  const store = getStoreById(storeId);
  const cats = getCategoriesByStore(storeId);
  const itms = getItemsByStore(storeId);
  return { store, categories: cats, items: itms };
}
