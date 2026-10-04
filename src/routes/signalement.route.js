import { Router } from 'express';
import { createSignalement, getSignalements, updateSignalement,getMachineSignalements } from '../controllers/signalement.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/',protect, createSignalement);
router.get('/',protect, getSignalements);
router.put('/:id',protect, updateSignalement);
router.get('/:id/signalements',protect, getMachineSignalements);

export default router;