const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: String,
  productId: String,        // or mongoose.Schema.Types.ObjectId if using actual IDs
  quantity: Number,
  price: Number,
  paymentMethod: String,
  saleDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SalesOrder', saleSchema, 'SalesOrder');
