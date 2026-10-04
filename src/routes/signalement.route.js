import { Router } from 'express';
import { createSignalement, getSignalements, updateSignalement,getMachineSignalements } from '../controllers/signalement.controller.js';

const router = Router();

router.post('/', createSignalement);
router.get('/', getSignalements);
router.put('/:id', updateSignalement);
router.get('/:id/signalements', getMachineSignalements);

export default router;