const mongoose = require('mongoose');

const stockEntrySchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  dateAdded: { type: Date, default: Date.now },
  supplier: String,
});

module.exports = mongoose.model('StockEntry', stockEntrySchema, 'StockEntry'); 
