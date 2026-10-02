import express from 'express';
import { login, createUser, getProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/login', login);

// Protected routes
router.post('/users', protect, createUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;