const User = require('../models/User');

// @desc    Create a new user
// @route   POST /users
// @access  Public or Protected (optional)
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (later add password hashing)
    const user = await User.create({ username, email, password, role });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all users
// @route   GET /users
// @access  Admin only (optional)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
};
