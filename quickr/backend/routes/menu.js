const express = require('express');
const Hotel = require('../models/Hotel');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ name: 'abhirami' });
    
    // Return static menu as fallback
    const staticMenu = [
      { _id: '1', name: 'Chicken Biryani', category: 'Main Course', price: 250, description: 'Spicy chicken biryani', imageUrl: 'https://images.unsplash.com/photo-1610303822215-20ab8191ee50?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '2', name: 'Paneer Butter Masala', category: 'Main Course', price: 200, description: 'Creamy paneer curry', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0f5b3d4c31?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '3', name: 'Cold Lassi', category: 'Drinks', price: 50, description: 'Refreshing yogurt drink', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '4', name: 'Mutton Curry', category: 'Main Course', price: 280, description: 'Tender mutton in spiced gravy', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '5', name: 'Vegetable Fried Rice', category: 'Rice', price: 150, description: 'Mixed vegetables with fried rice', imageUrl: 'https://images.unsplash.com/photo-1543867519-afe464dc26ee?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '6', name: 'Tandoori Chicken', category: 'Main Course', price: 220, description: 'Spiced grilled chicken', imageUrl: 'https://images.unsplash.com/photo-1599599810694-e7c86d15c3b2?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '7', name: 'Naan Bread', category: 'Bread', price: 40, description: 'Traditional Indian bread', imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '8', name: 'Mango Lassi', category: 'Drinks', price: 60, description: 'Sweet mango yogurt drink', imageUrl: 'https://images.unsplash.com/photo-1585518419759-6b4971421c1e?w=300&h=200&fit=crop', isAvailable: true },
    ];
    
    if (!hotel) {
      return res.json(staticMenu);
    }

    const menuItems = await MenuItem.find({ _id: { $in: hotel.menuItems }, isAvailable: true });
    res.json(menuItems.length > 0 ? menuItems : staticMenu);
  } catch (err) {
    // Return static menu on error
    const staticMenu = [
      { _id: '1', name: 'Chicken Biryani', category: 'Main Course', price: 250, description: 'Spicy chicken biryani', imageUrl: 'https://images.unsplash.com/photo-1610303822215-20ab8191ee50?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '2', name: 'Paneer Butter Masala', category: 'Main Course', price: 200, description: 'Creamy paneer curry', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0f5b3d4c31?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '3', name: 'Cold Lassi', category: 'Drinks', price: 50, description: 'Refreshing yogurt drink', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '4', name: 'Mutton Curry', category: 'Main Course', price: 280, description: 'Tender mutton in spiced gravy', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '5', name: 'Vegetable Fried Rice', category: 'Rice', price: 150, description: 'Mixed vegetables with fried rice', imageUrl: 'https://images.unsplash.com/photo-1543867519-afe464dc26ee?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '6', name: 'Tandoori Chicken', category: 'Main Course', price: 220, description: 'Spiced grilled chicken', imageUrl: 'https://images.unsplash.com/photo-1599599810694-e7c86d15c3b2?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '7', name: 'Naan Bread', category: 'Bread', price: 40, description: 'Traditional Indian bread', imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop', isAvailable: true },
      { _id: '8', name: 'Mango Lassi', category: 'Drinks', price: 60, description: 'Sweet mango yogurt drink', imageUrl: 'https://images.unsplash.com/photo-1585518419759-6b4971421c1e?w=300&h=200&fit=crop', isAvailable: true },
    ];
    res.json(staticMenu);
  }
});

// GET /api/menu/:hotelId
router.get('/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    // Return static menu for now
    const staticMenu = [
      { _id: '1', name: 'Chicken Biryani', category: 'Main Course', price: 250, description: 'Spicy chicken biryani', imageUrl: 'https://source.unsplash.com/random/300x200/?chicken-biryani', isAvailable: true },
      { _id: '2', name: 'Paneer Butter Masala', category: 'Main Course', price: 200, description: 'Creamy paneer curry', imageUrl: 'https://source.unsplash.com/random/300x200/?paneer-butter-masala', isAvailable: true },
      { _id: '3', name: 'Cold Lassi', category: 'Drinks', price: 50, description: 'Refreshing yogurt drink', imageUrl: 'https://source.unsplash.com/random/300x200/?lassi', isAvailable: true },
    ];
    res.json(staticMenu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/menu
router.post('/', async (req, res) => {
  const { name, category, price, description, imageUrl } = req.body;
  try {
    const menuItem = new MenuItem({ name, category, price, description, imageUrl });
    await menuItem.save();

    // Add to hotel
    const hotel = await Hotel.findOne({ name: 'abhirami' });
    hotel.menuItems.push(menuItem._id);
    await hotel.save();

    // Emit update
    global.io.emit('menu:updated', { hotelId: 'abhirami' });

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/menu/:id
router.patch('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    // Emit update
    global.io.emit('menu:updated', { hotelId: 'abhirami' });

    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/menu/:id
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    // Remove from hotel
    const hotel = await Hotel.findOne({ name: 'abhirami' });
    hotel.menuItems = hotel.menuItems.filter(id => id.toString() !== req.params.id);
    await hotel.save();

    // Emit update
    global.io.emit('menu:updated', { hotelId: 'abhirami' });

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;