const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  dueDate: Date,
  isPaid: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
