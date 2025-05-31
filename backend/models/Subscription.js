const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  startDate: Date,
  endDate: Date,
  isActive: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
