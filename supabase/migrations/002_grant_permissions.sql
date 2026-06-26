-- Grant permissions to roles
GRANT SELECT ON stores TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON menu_items TO anon;
GRANT SELECT ON modifier_groups TO anon;
GRANT SELECT ON modifier_options TO anon;

GRANT ALL ON stores TO authenticated;
GRANT ALL ON categories TO authenticated;
GRANT ALL ON menu_items TO authenticated;
GRANT ALL ON modifier_groups TO authenticated;
GRANT ALL ON modifier_options TO authenticated;
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;
GRANT ALL ON user_profiles TO authenticated;