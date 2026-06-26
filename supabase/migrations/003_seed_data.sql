-- Seed data for stores
INSERT INTO stores (name, slug, description, whatsapp, phone, address, delivery_info, delivery_fee, delivery_min_order, opening_hours, theme_primary_color, has_delivery, has_takeout, is_active)
VALUES
  ('Burger do Ze', 'burger-do-ze', 'A melhor hamburgueria artesanal do bairro!', '5585987654321', '558532345678', 'Rua das Flores, 123 - Centro, Fortaleza - CE', 'Taxa fixa de R$ 5,00 para bairros proximos', 5.00, 20.00, '{}', '#E65100', true, true, true),
  ('Pizza da Carla', 'pizza-da-carla', 'Pizzas artesanais com massa fermentada por 48h', '5585998765432', '558534567890', 'Av. Beira Mar, 500 - Meireles, Fortaleza - CE', 'Gratis para pedidos acima de R$ 40', 0, 30.00, '{}', '#C62828', true, true, true);

-- Get store IDs
DO $$
DECLARE
  burger_id UUID;
  pizza_id UUID;
BEGIN
  SELECT id INTO burger_id FROM stores WHERE slug = 'burger-do-ze';
  SELECT id INTO pizza_id FROM stores WHERE slug = 'pizza-da-carla';

  -- Categories for Burger do Ze
  INSERT INTO categories (store_id, name, description, icon, display_order, is_active)
  VALUES
    (burger_id, 'Hamburgueres', 'Nossos burgers artesanais', '🍔', 1, true),
    (burger_id, 'Porcoes', 'Acompanhamentos e porcoes', '🍟', 2, true),
    (burger_id, 'Bebidas', 'Refrigerantes, sucos e mais', '🥤', 3, true),
    (burger_id, 'Sobremesas', 'Doces para finalizar', '🍨', 4, true),
    (burger_id, 'Promocoes', 'Combos e ofertas especiais', '🔥', 5, true);

  -- Categories for Pizza da Carla
  INSERT INTO categories (store_id, name, description, icon, display_order, is_active)
  VALUES
    (pizza_id, 'Pizzas Salgadas', 'Pizzas tradicionais e especiais', '🍕', 1, true),
    (pizza_id, 'Pizzas Doces', 'Pizzas para sobremesa', '🍫', 2, true),
    (pizza_id, 'Bebidas', 'Refrigerantes, sucos e cervejas', '🍺', 3, true);
END $$;