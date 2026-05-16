const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// GET /api/analytics/today
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const orders = await Order.find({
      createdAt: { $gte: today, $lt: tomorrow },
      status: 'delivered'
    });

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Top dishes: count item frequencies
    const itemCounts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.menuItemId] = (itemCounts[item.menuItemId] || 0) + item.quantity;
      });
    });

    const topDishes = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({ menuItemId: id, count }));

    res.json({ revenue, topDishes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;