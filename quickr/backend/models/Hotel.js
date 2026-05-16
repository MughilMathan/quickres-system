const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // URL or path
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

module.exports = mongoose.model('Hotel', hotelSchema);