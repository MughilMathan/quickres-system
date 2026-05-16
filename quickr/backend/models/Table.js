const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableId: { type: String, required: true, unique: true },
  sessionId: { type: String },
  status: { type: String, enum: ['free', 'occupied'], default: 'free' },
  currentOrderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('Table', tableSchema);