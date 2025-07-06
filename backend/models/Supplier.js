const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },  // Optional
  address: { type: String, required: true },
});

module.exports = mongoose.model('Supplier', supplierSchema, 'Supplier');
