const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Store hashed password
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
