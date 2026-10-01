import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/db.js';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'MachineCare API is up and running' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});