import { fetchallmachines,machinecreate ,updateMachine, 
    deleteMachine, 
    getMachineSignalements} from "../controllers/machine.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/allmachines',protect,fetchallmachines);
router.post('/addmachine',protect,machinecreate);
router.put('/:id', protect, updateMachine);
router.delete('/:id', protect, deleteMachine);
router.get('/:id/signalements', protect, getMachineSignalements);

export default router;