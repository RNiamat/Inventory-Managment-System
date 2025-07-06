const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  supplier: String,
  quantity: Number,
  price: Number,
  expiryDate: String
});

module.exports = mongoose.model('products', productSchema);
