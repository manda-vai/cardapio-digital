-- Seed menu items
DO $$
DECLARE
  burger_id UUID;
  pizza_id UUID;
  cat_hamburgueres UUID;
  cat_porcoes UUID;
  cat_bebidas_burger UUID;
  cat_sobremesas UUID;
  cat_promocoes UUID;
  cat_pizzas_salgadas UUID;
  cat_pizzas_doces UUID;
  cat_bebidas_pizza UUID;
BEGIN
  SELECT id INTO burger_id FROM stores WHERE slug = 'burger-do-ze';
  SELECT id INTO pizza_id FROM stores WHERE slug = 'pizza-da-carla';

  SELECT id INTO cat_hamburgueres FROM categories WHERE store_id = burger_id AND name = 'Hamburgueres';
  SELECT id INTO cat_porcoes FROM categories WHERE store_id = burger_id AND name = 'Porcoes';
  SELECT id INTO cat_bebidas_burger FROM categories WHERE store_id = burger_id AND name = 'Bebidas';
  SELECT id INTO cat_sobremesas FROM categories WHERE store_id = burger_id AND name = 'Sobremesas';
  SELECT id INTO cat_promocoes FROM categories WHERE store_id = burger_id AND name = 'Promocoes';

  SELECT id INTO cat_pizzas_salgadas FROM categories WHERE store_id = pizza_id AND name = 'Pizzas Salgadas';
  SELECT id INTO cat_pizzas_doces FROM categories WHERE store_id = pizza_id AND name = 'Pizzas Doces';
  SELECT id INTO cat_bebidas_pizza FROM categories WHERE store_id = pizza_id AND name = 'Bebidas';

  -- Hamburgueres
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_hamburgueres, burger_id, 'Classic Burger', 'Hamburguer 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial no pao brioche.', 28.90, 24.90, true, true, 1, '{}', 15),
    (cat_hamburgueres, burger_id, 'Smash Burger', 'Hamburguer duplo 180g cada, queijo prato, picles, cebola caramelizada e molho barbecue defumado.', 34.90, NULL, true, true, 2, '{}', 18),
    (cat_hamburgueres, burger_id, 'Veggie Burger', 'Hamburguer de grao-de-bico e quinoa, queijo vegano, alface, tomate, cebola roxa e maionese vegana.', 32.90, 29.90, true, true, 3, '{"vegano","sem-gluten"}', 15),
    (cat_hamburgueres, burger_id, 'Monster Burger', 'Tres hamburgueres 180g, queijo cheddar duplo, bacon, onion rings, molho especial e barbecue.', 49.90, NULL, true, true, 4, '{}', 25);

  -- Porcoes
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_porcoes, burger_id, 'Batata Frita', 'Porcao de batata frita crocante com sal e orégano. Serve 2 pessoas.', 18.90, 14.90, true, true, 1, '{"vegano"}', 10),
    (cat_porcoes, burger_id, 'Aneis de Cebola', 'Porcao de onion rings empanados, crocantes por fora e macios por dentro. Serve 2.', 22.90, NULL, true, true, 2, '{"vegano"}', 12);

  -- Bebidas
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_bebidas_burger, burger_id, 'Coca-Cola Lata', 'Coca-Cola 350ml', 6.00, NULL, true, true, 1, '{}', 1),
    (cat_bebidas_burger, burger_id, 'Guarana Antarctica', 'Guarana Antarctica 350ml', 5.50, NULL, true, true, 2, '{}', 1),
    (cat_bebidas_burger, burger_id, 'Suco Natural', 'Suco natural da polpa. Sabores: laranja, acerola, maracuja, caju.', 8.00, NULL, true, true, 3, '{"vegano","natural"}', 5),
    (cat_bebidas_burger, burger_id, 'Agua Mineral', 'Agua mineral sem gas 500ml', 3.50, NULL, true, true, 4, '{}', 1);

  -- Sobremesas
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_sobremesas, burger_id, 'Petit Gateau', 'Bolinho de chocolate com casca e recheio cremoso, acompanha sorvete de creme.', 22.90, NULL, true, true, 1, '{}', 12);

  -- Promocoes
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_promocoes, burger_id, 'Combo Casal', '2 Classic Burgers + Batata Gigante + 2 Refrigerantes. Economia de R$ 15!', 79.90, 64.90, true, true, 1, '{}', 20);

  -- Pizzas Salgadas
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_pizzas_salgadas, pizza_id, 'Mussarela', 'Molho de tomate, mussarela, oregano.', 38.90, 34.90, true, true, 1, '{}', 20),
    (cat_pizzas_salgadas, pizza_id, 'Calabresa', 'Molho de tomate, mussarela, calabresa fatiada, cebola, oregano.', 42.90, NULL, true, true, 2, '{}', 20),
    (cat_pizzas_salgadas, pizza_id, 'Portuguesa', 'Molho de tomate, mussarela, presunto, ovos, cebola, pimentao, azeitona, ervilha.', 46.90, NULL, true, true, 3, '{}', 22),
    (cat_pizzas_salgadas, pizza_id, 'Frango com Catupiry', 'Molho de tomate, mussarela, frango desfiado, catupiry, milho, oregano.', 45.90, 40.90, true, true, 4, '{}', 22);

  -- Pizzas Doces
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_pizzas_doces, pizza_id, 'Brigadeiro', 'Chocolate, leite condensado, granulado. Cobertura de chocolate belga.', 44.90, NULL, true, true, 1, '{}', 15);

  -- Bebidas Pizza
  INSERT INTO menu_items (category_id, store_id, name, description, price, promotional_price, is_available, is_active, display_order, dietary_tags, preparation_time)
  VALUES
    (cat_bebidas_pizza, pizza_id, 'Coca-Cola 2L', 'Refrigerante Coca-Cola 2 litros', 12.00, NULL, true, true, 1, '{}', 1);
END $$;