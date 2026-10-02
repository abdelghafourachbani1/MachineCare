import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// @desc    Authenticate user & return JWT
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          email: user.email,
        },
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Create new user (protected route)
// @route   POST /api/auth/users
export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email address is already in use' });
    }

    const user = await User.create({ email, password });

    return res.status(201).json({
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user profile
// @route   GET /api/auth/profile
export const getProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(409).json({ message: 'Email address is already in use' });
      }
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};