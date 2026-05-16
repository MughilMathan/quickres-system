const express = require('express');
const Hotel = require('../models/Hotel');
const Table = require('../models/Table');
const Session = require('../models/Session');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

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

// GET /api/scan/redirect/:tableId - redirect scanner result to mobile app path
router.get('/redirect/:tableId', async (req, res) => {
  const mobileUrl = process.env.MOBILE_APP_URL || 'http://localhost:5173';
  const { tableId } = req.params;
  return res.redirect(`${mobileUrl}/table/${tableId}`);
});

// POST /api/scan - Handle QR code scan
router.post('/scan', async (req, res) => {
  const { hotelId, tableId, sessionId } = req.body;
  try {
    // Find hotel
    const hotel = await Hotel.findOne({ name: hotelId || 'abhirami' });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    // Find or create table
    let table = await Table.findOne({ tableId });
    if (!table) {
      table = new Table({ 
        tableId, 
        status: 'occupied',
        hotelId: hotel._id 
      });
      await table.save();
      hotel.tables.push(table._id);
      await hotel.save();
    } else {
      table.status = 'occupied';
      await table.save();
    }

    // Find or create session
    let session = await Session.findOne({ sessionId });
    if (!session) {
      session = new Session({ 
        sessionId, 
        tableId, 
        hotelId: hotel._id,
        users: [{ name: 'Customer' }] 
      });
      await session.save();
    }

    // Get menu items
    const menuItems = await MenuItem.find({ hotelId: hotel._id });

    // Get active orders for session
    const activeOrders = await Order.find({ sessionId, status: { $ne: 'delivered' } });

    // Emit scan event via socket.io
    if (global.io) {
      global.io.emit('table:scanned', {
        tableId,
        hotelId,
        timestamp: new Date()
      });
      global.io.to(`table_${tableId}`).emit('session:active', {
        sessionId,
        tableId,
        hotelId
      });
    }

    const redirectUrl = `${process.env.MOBILE_APP_URL || 'http://localhost:5173'}/table/${tableId}`;

    res.json({ 
      success: true,
      hotel, 
      table, 
      session, 
      menuItems, 
      activeOrders, 
      redirectUrl 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/scan/session/:sessionId - Get session details
router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const orders = await Order.find({ sessionId: req.params.sessionId });
    res.json({ session, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/scan/validate-qr - Validate QR code data
router.post('/validate-qr', async (req, res) => {
  const { qrData } = req.body;
  try {
    const url = new URL(qrData);
    const tableId = url.pathname.split('/').pop();
    
    if (!tableId || !tableId.match(/^T\d+$/)) {
      return res.status(400).json({ valid: false, message: 'Invalid table QR code' });
    }

    const table = await Table.findOne({ tableId });
    if (!table) {
      return res.status(404).json({ valid: false, message: 'Table not found' });
    }

    res.json({ valid: true, tableId, table });
  } catch (err) {
    res.status(400).json({ valid: false, message: err.message });
  }
});

module.exports = router;