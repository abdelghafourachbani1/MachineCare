import { fetchallmachines,machinecreate } from "../controllers/machine.controller.js";
import { Router } from "express";

const router = Router();

router.get('/allmachines',fetchallmachines);
router.post('/addmachine',machinecreate);

export default router;