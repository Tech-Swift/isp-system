const Invoice = require('../models/Invoice');

// @desc    Create an invoice
// @route   POST /invoices
// @access  Admin or Protected
const createInvoice = async (req, res) => {
  try {
    const { customerId, amount, status, dueDate } = req.body;

    if (!customerId || !amount || !dueDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const invoice = await Invoice.create({
      customerId,
      amount,
      status: status || 'pending',
      dueDate,
    });

    res.status(201).json({ message: 'Invoice created', invoice });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all invoices
// @route   GET /invoices
// @access  Admin
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customerId', 'name email');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
};
