const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  hotelId: { type: String, required: true },
  tableId: { type: String, required: true },
  sessionId: { type: String, required: true },
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    variantLabel: { type: String },
    specialInstructions: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['placed', 'accepted', 'cooking', 'ready', 'delivered'], default: 'placed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);