const menuData = [
  // Breakfast / Tiffin
  { name: 'Idly (1 No)', price: 17, category: 'Breakfast', type: 'Veg', description: 'Soft steamed rice cake (1 pc)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Idly (2 Nos)', price: 34, category: 'Breakfast', type: 'Veg', description: 'Soft steamed rice cakes (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Medhu Vada (1 No)', price: 22, category: 'Breakfast', type: 'Veg', description: 'Crispy lentil donut (1 pc)', imageUrl: 'https://images.unsplash.com/photo-1601050638917-3d9616053746?w=800&q=80' },
  { name: 'Sambar Vada (1 No)', price: 27, category: 'Breakfast', type: 'Veg', description: 'Vada soaked in sambar', imageUrl: 'https://images.unsplash.com/photo-1601050638917-3d9616053746?w=800&q=80' },
  { name: 'Curd Vada (1 No)', price: 30, category: 'Breakfast', type: 'Veg', description: 'Vada soaked in spiced curd', imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80' },
  { name: 'Ven Pongal', price: 55, category: 'Breakfast', type: 'Veg', description: 'Ghee-loaded rice and lentil mash', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Kichadi', price: 55, category: 'Breakfast', type: 'Veg', description: 'Savory semolina and vegetable mash', imageUrl: 'https://images.unsplash.com/photo-1601050638917-3d9616053746?w=800&q=80' },
  { name: 'Poori Masala (1 No)', price: 30, category: 'Breakfast', type: 'Veg', description: 'Fluffy fried bread with potato masala (1 pc)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Poori Masala (2 Nos)', price: 60, category: 'Breakfast', type: 'Veg', description: 'Fluffy fried bread with potato masala (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },

  // Uthappam
  { name: 'Plain Uthappam', price: 55, category: 'Uthappam', type: 'Veg', description: 'Thick savory pancake', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Onion Uthappam', price: 70, category: 'Uthappam', type: 'Veg', description: 'Uthappam topped with chopped onions', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Podi Uthappam', price: 70, category: 'Uthappam', type: 'Veg', description: 'Uthappam sprinkled with spicy podi', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Uthappam', price: 90, category: 'Uthappam', type: 'Veg', description: 'Ghee enriched uthappam', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },

  // Roast
  { name: 'Plain Roast', price: 55, category: 'Roast', type: 'Non-veg', description: 'Crispy plain dosa roast', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Masala Roast', price: 70, category: 'Roast', type: 'Non-veg', description: 'Roast with potato masala', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Onion Roast', price: 70, category: 'Roast', type: 'Non-veg', description: 'Roast with onions', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Roast', price: 90, category: 'Roast', type: 'Non-veg', description: 'Crispy ghee roast dosa', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Masala Roast', price: 100, category: 'Roast', type: 'Non-veg', description: 'Ghee roast with masala', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Ghee Onion Roast', price: 100, category: 'Roast', type: 'Non-veg', description: 'Ghee roast with onions', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Mysore Masala Roast', price: 110, category: 'Roast', type: 'Non-veg', description: 'Spicy Mysore-style roast', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Paper Roast', price: 110, category: 'Roast', type: 'Non-veg', description: 'Ultra-thin crispy toast', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },

  // Dosa
  { name: 'Podi Dosa', price: 65, category: 'Dosa', type: 'Veg', description: 'Dosa with spicy podi', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Podi Masala Dosa', price: 80, category: 'Dosa', type: 'Veg', description: 'Podi dosa with masala', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Podi Onion Dosa', price: 80, category: 'Dosa', type: 'Veg', description: 'Podi dosa with onions', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Podi Dosa', price: 100, category: 'Dosa', type: 'Veg', description: 'Ghee podi dosa', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Onion Podi Dosa', price: 110, category: 'Dosa', type: 'Veg', description: 'Ghee onion podi dosa', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Ghee Masala Podi Dosa', price: 110, category: 'Dosa', type: 'Veg', description: 'Ghee masala podi dosa', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },

  // Rava Variants
  { name: 'Rava Roast', price: 65, category: 'Rava', type: 'Veg', description: 'Semolina roast dosa', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Onion Rava Roast', price: 80, category: 'Rava', type: 'Veg', description: 'Rava roast with onions', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { name: 'Rava Masala Roast', price: 80, category: 'Rava', type: 'Veg', description: 'Rava roast with masala', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Ghee Rava Roast', price: 90, category: 'Rava', type: 'Veg', description: 'Ghee rava roast', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },

  // Breads
  { name: 'Parotta (1 No)', price: 40, category: 'Breads', description: 'Soft layered parotta', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Parotta (2 Nos)', price: 80, category: 'Breads', description: 'Soft layered parottas (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Chapathi (1 No)', price: 35, category: 'Breads', type: 'Veg', description: 'Whole wheat chapathi', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Chapathi (2 Nos)', price: 70, category: 'Breads', type: 'Veg', description: 'Whole wheat chapathis (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Butter Parotta (1)', price: 50, category: 'Breads', description: 'Butter spread parotta', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Butter Parotta (2)', price: 100, category: 'Breads', description: 'Butter spread parottas (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Butter Chapathi (1)', price: 50, category: 'Breads', type: 'Veg', description: 'Butter spread chapathi', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Butter Chapathi (2)', price: 100, category: 'Breads', type: 'Veg', description: 'Butter spread chapathis (2 pcs)', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },

  // Specials
  { name: 'Chilly Idly', price: 65, category: 'Specials', type: 'Non-veg', description: 'Crispy fried idly with spices', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Chilly Parotta', price: 110, category: 'Specials', type: 'Non-veg', description: 'Shredded parotta with spicy masala', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Channa Batura', price: 70, category: 'Specials', type: 'Veg', description: 'Huge fried bread with chickpea curry', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },

  // Biryani
  { name: 'Chicken Biryani', price: 100, category: 'Biryani', type: 'Non-veg', description: 'Fragrant rice with spicy chicken', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80' },
  { name: 'Mutton Biryani', price: 240, category: 'Biryani', type: 'Non-veg', description: 'Fragrant rice with tender mutton', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80' },

  // Chicken Specials
  { name: 'Chilly Chicken', price: 60, category: 'Chicken', type: 'Non-veg', description: 'Spicy 100g chicken cubes', imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80' },
  {
    name: 'Tandoori',
    category: 'Chicken',
    type: 'Non-veg',
    description: 'Clay oven roasted chicken',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    variants: [
      { label: 'Quarter', price: 100 },
      { label: 'Half', price: 160 },
      { label: 'Full', price: 240 }
    ]
  },
  {
    name: 'Grill Chicken',
    category: 'Chicken',
    type: 'Non-veg',
    description: 'Perfectly grilled chicken',
    imageUrl: 'https://images.unsplash.com/photo-1598511726623-d30d95958611?w=800&q=80',
    variants: [
      { label: 'Quarter', price: 100 },
      { label: 'Half', price: 160 },
      { label: 'Full', price: 240 }
    ]
  },

  // Mutton Dry & Gravy
  { name: 'Mutton Pallipalayam', price: 200, category: 'Mutton', type: 'Non-veg', description: 'Spicy dry mutton specialty', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Mutton Fry / Gravy', price: 200, category: 'Mutton', type: 'Non-veg', description: 'Tender mutton in rich gravy', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Kongu Mutton Curry', price: 200, category: 'Mutton', type: 'Non-veg', description: 'Traditional Kongu region mutton curry', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Mutton Pepper Fry', price: 200, category: 'Mutton', type: 'Non-veg', description: 'Mutton tossed in black pepper', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Mutton Nalli Fry/Gravy', price: 250, category: 'Mutton', type: 'Non-veg', description: 'Mutton bone marrow specialty', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Thalai Fry / Gravy', price: 190, category: 'Mutton', type: 'Non-veg', description: 'Mutton head meat specialty', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Kudal Fry Gravy', price: 180, category: 'Mutton', type: 'Non-veg', description: 'Goat intestine specialty', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Mutton Kola Urundai', price: 35, category: 'Mutton', type: 'Non-veg', description: 'Fried mutton meatball', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },
  { name: 'Aatu Kaal Paya', price: 200, category: 'Mutton', type: 'Non-veg', description: 'Goat leg soup', imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80' },

  // Seafood
  { name: 'Fish Pallipalayam', price: 180, category: 'Seafood', type: 'Non-veg', description: 'Fish prepared in Pallipalayam style', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
  { name: 'Vanjiram Fish/Tawa', price: 210, category: 'Seafood', type: 'Non-veg', description: 'King fish shallow fried', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
  { name: 'Fish Chukka', price: 190, category: 'Seafood', type: 'Non-veg', description: 'Dry fish specialty', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
  { name: 'Fish 65', price: 190, category: 'Seafood', type: 'Non-veg', description: 'Spicy fried fish bits', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
  { name: 'Prawn Fry / Masala', price: 200, category: 'Seafood', type: 'Non-veg', description: 'Tiger prawns in masala', imageUrl: 'https://images.unsplash.com/photo-1565689157206-0fddef750e39?w=800&q=80' },
  { name: 'Nethili Fish', price: 190, category: 'Seafood', type: 'Non-veg', description: 'Crispy fried anchovies', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
  { name: 'Prawn 65', price: 200, category: 'Seafood', type: 'Non-veg', description: 'Crispy fried prawns', imageUrl: 'https://images.unsplash.com/photo-1565689157206-0fddef750e39?w=800&q=80' },
  { name: 'Nethili Fish Fry', price: 200, category: 'Seafood', type: 'Non-veg', description: 'Anchovy fish fry', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },

  // Soup
  { name: 'Chicken Soup', price: 120, category: 'Soup', type: 'Non-veg', description: 'Hot and spicy chicken soup', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },
  { name: 'Aatukaal Soup', price: 120, category: 'Soup', type: 'Non-veg', description: 'Healthy goat leg soup', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },

  // Chinese
  { name: 'Chinese Chilly Chicken', price: 190, category: 'Chinese', type: 'Non-veg', description: 'Classic Indo-Chinese chilly chicken', imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80' },
  { name: 'Chicken Manjurain', price: 190, category: 'Chinese', type: 'Non-veg', description: 'Chicken in Manchurian sauce', imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80' },
  { name: 'Chinese Chilly Fish', price: 190, category: 'Chinese', type: 'Non-veg', description: 'Spicy chilly fish Indo-Chinese style', imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80' },
  { name: 'Fish Manjurian', price: 190, category: 'Chinese', type: 'Non-veg', description: 'Fish in Manchurian sauce', imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80' },

  // Tandoori / Tikka
  { name: 'Tandoori Half', price: 225, category: 'Tandoori', type: 'Non-veg', description: 'Half portion tandoori chicken', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80' },
  { name: 'Tandoori Full', price: 450, category: 'Tandoori', type: 'Non-veg', description: 'Full portion tandoori chicken', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80' },
  { name: 'Chicken Tikka', price: 210, category: 'Tandoori', type: 'Non-veg', description: 'Skewered chicken bits', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80' },
  { name: 'Fish Tikka', price: 210, category: 'Tandoori', type: 'Non-veg', description: 'Skewered spicy fish', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80' },

  // Kids Special
  { name: 'Boneless 65', price: 190, category: 'Kids', type: 'Non-veg', description: 'Spicy boneless chicken fry', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80' },
  { name: 'Chicken Lollipop', price: 190, category: 'Kids', type: 'Non-veg', description: 'Wings shaped like lollipops', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80' },

  // Vegetarian Specials
  { name: 'Paneer Tikka', price: 180, category: 'Vegetarian', type: 'Veg', description: 'Grilled paneer cubes', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Mushroom Tikka', price: 160, category: 'Vegetarian', type: 'Veg', description: 'Grilled marinated mushrooms', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Veg Fried Rice / Noodles', price: 160, category: 'Vegetarian', type: 'Veg', description: 'Rice or noodles with veggies', imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80' },
  { name: 'Gobi 65 / Gravy', price: 130, category: 'Vegetarian', type: 'Veg', description: 'Cauliflower specialty', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Paneer 65 / Butter Masala', price: 140, category: 'Vegetarian', type: 'Veg', description: 'Paneer specialty', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Mixed Veg Gravy', price: 140, category: 'Vegetarian', type: 'Veg', description: 'Assorted veggies in rich gravy', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Mushroom 65 / Gravy', price: 140, category: 'Vegetarian', type: 'Veg', description: 'Mushroom specialty', imageUrl: 'https://images.unsplash.com/photo-1567184109311-6652ef428059?w=800&q=80' },
  { name: 'Parotta + Veg Gravy', price: 32, category: 'Vegetarian', type: 'Veg', description: 'Parotta with vegetable kurma', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Veg Kothu Parotta', price: 130, category: 'Vegetarian', type: 'Veg', description: 'Minced parotta with vegetables', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { name: 'Cut Roti + Veg Gravy', price: 32, category: 'Vegetarian', type: 'Veg', description: 'Roti with vegetable curry', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },

  // Meals
  { name: 'South Indian Meals', price: 125, category: 'Meals', type: 'Veg', description: 'Rice + Sambar + Kulambu + Rasam + Kootu + Poriyal + Payasam + Appalam', imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80' },
  { name: 'Special Meals', price: 155, category: 'Meals', type: 'Non-veg', description: 'Chapathi + Biryani + Rice + Sambar + Kootu + Poriyal + Payasam + Curd + Appalam', imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80' },
  { name: 'Veg Meals (Lunch)', price: 130, category: 'Meals', type: 'Veg', description: 'Classic South Indian veg thali', imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80' },
  { name: 'Vegetable Biryani', price: 125, category: 'Meals', type: 'Veg', description: 'Fragrant veg rice medley', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80' },

  // Hot & Cool Drinks
  { name: 'Tea', price: 20, category: 'Drinks', description: 'Classic ginger tea', imageUrl: 'https://images.unsplash.com/photo-1544787210-2211dca2161b?w=800&q=80' },
  { name: 'Coffee', price: 25, category: 'Drinks', description: 'Filter coffee', imageUrl: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=800&q=80' },
  { name: 'Milk', price: 20, category: 'Drinks', description: 'Hot milk', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Horlicks', price: 40, category: 'Drinks', description: 'Energy drink', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Boost', price: 40, category: 'Drinks', description: 'Chocolatey malt drink', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Badam Milk', price: 40, category: 'Drinks', description: 'Hot almond milk', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Ragi Malt', price: 40, category: 'Drinks', description: 'Healthy ragi drink', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Lime Juice', price: 40, category: 'Drinks', description: 'Freshly squeezed lime juice', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80' },
  { name: 'Lime Soda', price: 40, category: 'Drinks', description: 'Bubbly lime soda', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80' },
  { name: 'Rose Milk', price: 50, category: 'Drinks', description: 'Chilled rose flavored milk', imageUrl: 'https://images.unsplash.com/photo-1550583724-125581db2ab8?w=800&q=80' },
  { name: 'Nanari Juice', price: 50, category: 'Drinks', description: 'Traditional sarasaparilla juice', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80' },
  { name: 'Strawberry Juice', price: 60, category: 'Drinks', description: 'Fresh fruit juice', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80' },

  // Desserts
  { name: 'Payasam', price: 65, category: 'Desserts', description: 'Sweet rice/vermicelli pudding', imageUrl: 'https://images.unsplash.com/photo-1514516317522-f7426301aa2b?w=800&q=80' },
  { name: 'Carrot Halwa', price: 75, category: 'Desserts', description: 'Grated carrot sweet pudding', imageUrl: 'https://images.unsplash.com/photo-1514516317522-f7426301aa2b?w=800&q=80' },
  { name: 'Lime Soda (Salt/Sweet)', price: 70, category: 'Desserts', description: 'Refreshing lime soda', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80' }
];

module.exports = menuData;
