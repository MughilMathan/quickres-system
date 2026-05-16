const express = require('express');
const Hotel = require('../models/Hotel');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ name: 'abhirami' });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const menuItems = await MenuItem.find({ _id: { $in: hotel.menuItems }, isAvailable: true });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
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