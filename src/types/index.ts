export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  banner_url: string;
  whatsapp: string;
  phone: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  address: string;
  delivery_info: string;
  delivery_fee: number;
  delivery_min_order: number;
  opening_hours: OpeningHours;
  theme_primary_color: string;
  has_delivery: boolean;
  has_takeout: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OpeningHours {
  [day: string]: { open: string; close: string; is_open: boolean };
}

export interface Category {
  id: string;
  store_id: string;
  name: string;
  description?: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  image_url?: string;
  is_available: boolean;
  is_active: boolean;
  display_order: number;
  dietary_tags: string[];
  preparation_time?: number;
  modifier_groups?: ModifierGroup[];
  created_at: string;
}

export interface ModifierGroup {
  id: string;
  item_id: string;
  name: string;
  type: "single" | "multiple";
  is_required: boolean;
  min_options: number;
  max_options: number;
  display_order: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  group_id: string;
  name: string;
  price_adjustment: number;
  is_default: boolean;
  display_order: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selected_modifiers: Record<string, string[]>; // group_id -> option_ids[]
  notes: string;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  store_id: string;
  customer_name: string;
  customer_phone: string;
  customer_notes?: string;
  items: OrderItem[];
  total_amount: number;
  status: "received" | "preparing" | "ready" | "delivered" | "cancelled";
  source: "whatsapp" | "web";
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  item_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  modifiers: string[]; // formatted modifier names
  notes: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  store_id: string;
  role: "owner" | "admin" | "staff";
}
