const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number },
  description: { type: String },
  imageUrl: { type: String },
  variants: [
    {
      label: { type: String },
      price: { type: Number }
    }
  ],
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);