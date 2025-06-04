const Subscription = require('../models/Subscription');

// @desc    Create a new subscription
// @route   POST /subscriptions
// @access  Public or Protected
const createSubscription = async (req, res) => {
  try {
    const { userId, plan, startDate, endDate, status } = req.body;

    // Simple validation
    if (!userId || !plan || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Optional: Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({ userId, status: 'active' });
    if (existingSubscription) {
      return res.status(400).json({ message: 'User already has an active subscription' });
    }

    const subscription = await Subscription.create({
      userId,
      plan,
      startDate,
      endDate,
      status: status || 'active', // default to active
    });

    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all subscriptions
// @route   GET /subscriptions
// @access  Admin only
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('userId', 'username email');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
};
