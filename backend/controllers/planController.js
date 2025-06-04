const Plan = require('../models/Plan');

// @desc    Create a new plan
// @route   POST /plans
// @access  Admin
const createPlan = async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const plan = await Plan.create({ name, price, duration });
    res.status(201).json({ message: 'Plan created', plan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all plans
// @route   GET /plans
// @access  Public
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createPlan,
  getPlans,
};
