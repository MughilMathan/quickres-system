const express = require('express');
const Table = require('../models/Table');

const router = express.Router();

// GET /api/tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find({});
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/tables/:tableId/free
router.patch('/:tableId/free', async (req, res) => {
  try {
    const table = await Table.findOneAndUpdate({ tableId: req.params.tableId }, { status: 'free', currentOrderIds: [] }, { new: true });
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tables/:tableId/session
router.get('/:tableId/session', async (req, res) => {
  const { tableId } = req.params;
  try {
    const Order = require('../models/Order');
    const order = await Order.findOne({ tableId, status: { $ne: 'delivered' } }).sort({ createdAt: -1 });
    if (order) {
      return res.json({ active: true, order });
    }
    res.json({ active: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;