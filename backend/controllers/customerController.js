const Customer = require('../models/Customer');

// @desc    Create a new customer
// @route   POST /customers
// @access  Public or Admin
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const customer = await Customer.create({ name, email, phone });
    res.status(201).json({ message: 'Customer created', customer });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all customers
// @route   GET /customers
// @access  Admin
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
};
