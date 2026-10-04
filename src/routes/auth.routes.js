import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js'; // We will create this next!

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); 

export default router;