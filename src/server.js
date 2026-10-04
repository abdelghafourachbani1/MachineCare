import express, { Router } from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import machineRoutes from './routes/machine.routes.js';
import signalementRoutes from './routes/signalement.routes.js';

connectDB();
const app = express()
app.use(express.json())
app.use('/api/machines', machineRoutes);
app.use('/api/signalements', signalementRoutes);

app.listen(process.env.PORT , () =>{
    console.log(`server runn on port ${process.env.PORT}`);
});