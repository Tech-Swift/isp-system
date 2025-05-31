const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: String,
  speed: String, // e.g., "10Mbps"
  price: Number,
  validity: String // e.g., "Monthly", "Weekly"
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
