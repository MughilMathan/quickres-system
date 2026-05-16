const express = require('express');
const Order = require('../models/Order');
const Table = require('../models/Table');

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  const { hotelId, tableId, sessionId, items, totalAmount } = req.body;
  try {
    const orderId = `A${Math.floor(1000 + Math.random() * 9000)}`;
    const order = new Order({
      orderId,
      hotelId: hotelId || 'abhirami',
      tableId,
      sessionId: sessionId || `${tableId}-${Date.now()}`,
      items,
      totalAmount,
      status: 'placed'
    });
    await order.save();

    const table = await Table.findOne({ tableId });
    if (table) {
      table.currentOrderIds.push(order._id);
      await table.save();
    }

    const payload = {
      orderId: order.orderId,
      tableId: order.tableId,
      status: order.status,
      estimatedTime: 15,
    };

    global.io.emit('order:new', order);
    global.io.to(`table_${order.tableId}`).emit('order_status_updated', payload);
    global.io.emit('order_status_updated', payload);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/active?hotelId=...
router.get('/active', async (req, res) => {
  try {
    const filter = { status: { $ne: 'delivered' } };
    if (req.query.hotelId) filter.hotelId = req.query.hotelId;
    if (req.query.tableId) filter.tableId = req.query.tableId;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/active/:tableId
router.get('/active/:tableId', async (req, res) => {
  try {
    const orders = await Order.find({ tableId: req.params.tableId, status: { $ne: 'delivered' } }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const estimatedTime = status === 'delivered' ? 0 : status === 'ready' ? 5 : status === 'cooking' ? 10 : 15;
    const payload = {
      orderId: order.orderId,
      tableId: order.tableId,
      status: order.status,
      estimatedTime,
    };

    global.io.emit('order:statusUpdate', { orderId: order.orderId, status: order.status });
    global.io.to(`table_${order.tableId}`).emit('order_status_updated', payload);
    global.io.emit('order_status_updated', payload);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:orderId/session-clear
router.patch('/:orderId/session-clear', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Mark as delivered and clear table if linked
    order.status = 'delivered';
    await order.save();

    const table = await Table.findOne({ tableId: order.tableId });
    if (table) {
      table.currentOrderIds = table.currentOrderIds.filter(id => id.toString() !== order._id.toString());
      await table.save();
    }

    res.json({ message: 'Session cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
