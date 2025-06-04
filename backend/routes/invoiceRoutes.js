 const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new invoice
router.post('/', async (req, res) => {
  const invoice = new Invoice(req.body);
  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update invoice by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(updatedInvoice);
  } catch (err)
  {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
