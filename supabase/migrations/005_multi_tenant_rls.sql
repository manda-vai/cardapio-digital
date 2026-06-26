-- Drop existing authenticated policies (too permissive)
DROP POLICY IF EXISTS "Authenticated users can manage stores" ON stores;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can manage modifier groups" ON modifier_groups;
DROP POLICY IF EXISTS "Authenticated users can manage modifier options" ON modifier_options;
DROP POLICY IF EXISTS "Authenticated users can manage orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can manage order items" ON order_items;
DROP POLICY IF EXISTS "Authenticated users can manage user profiles" ON user_profiles;

-- Helper function: get current user's store_id
CREATE OR REPLACE FUNCTION get_user_store_id()
RETURNS UUID AS $$
  SELECT store_id FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: check if user owns a store
CREATE OR REPLACE FUNCTION user_owns_store(target_store_id UUID)
RETURNS BOOLEAN AS $$
  SELECT store_id = target_store_id FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: check if user is owner/admin of a store
CREATE OR REPLACE FUNCTION user_is_store_admin(target_store_id UUID)
RETURNS BOOLEAN AS $$
  SELECT store_id = target_store_id AND role IN ('owner', 'admin')
  FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Stores: users can only update their own store
CREATE POLICY "Users can view own store" ON stores
  FOR SELECT USING (
    auth.role() = 'authenticated' AND user_owns_store(id)
  );

CREATE POLICY "Users can update own store" ON stores
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND user_owns_store(id)
  );

-- Categories: users can manage their own store's categories
CREATE POLICY "Users can view own categories" ON categories
  FOR SELECT USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can insert own categories" ON categories
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

-- Menu items: users can manage their own store's items
CREATE POLICY "Users can view own items" ON menu_items
  FOR SELECT USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can insert own items" ON menu_items
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can update own items" ON menu_items
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can delete own items" ON menu_items
  FOR DELETE USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

-- Modifier groups: through item ownership
CREATE POLICY "Users can view own modifier groups" ON modifier_groups
  FOR SELECT USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM menu_items WHERE menu_items.id = modifier_groups.item_id
      AND user_owns_store(menu_items.store_id)
    )
  );

CREATE POLICY "Users can manage own modifier groups" ON modifier_groups
  FOR ALL USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM menu_items WHERE menu_items.id = modifier_groups.item_id
      AND user_owns_store(menu_items.store_id)
    )
  );

-- Modifier options: through group ownership
CREATE POLICY "Users can view own modifier options" ON modifier_options
  FOR SELECT USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM modifier_groups
      JOIN menu_items ON menu_items.id = modifier_groups.item_id
      WHERE modifier_groups.id = modifier_options.group_id
      AND user_owns_store(menu_items.store_id)
    )
  );

CREATE POLICY "Users can manage own modifier options" ON modifier_options
  FOR ALL USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM modifier_groups
      JOIN menu_items ON menu_items.id = modifier_groups.item_id
      WHERE modifier_groups.id = modifier_options.group_id
      AND user_owns_store(menu_items.store_id)
    )
  );

-- Orders: users can manage their own store's orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND user_owns_store(store_id)
  );

-- Order items: through order ownership
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id
      AND user_owns_store(orders.store_id)
    )
  );

CREATE POLICY "Users can manage own order items" ON order_items
  FOR ALL USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id
      AND user_owns_store(orders.store_id)
    )
  );

-- User profiles: users can view/edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (
    auth.role() = 'authenticated' AND id = auth.uid()
  );

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND id = auth.uid()
  );

-- Allow users to create their own profile during onboarding
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND id = auth.uid()
  );

-- Allow owners to view other users in their store (for team management)
CREATE POLICY "Owners can view store users" ON user_profiles
  FOR SELECT USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM user_profiles AS up
      WHERE up.id = auth.uid()
      AND up.role = 'owner'
      AND up.store_id = user_profiles.store_id
    )
  );