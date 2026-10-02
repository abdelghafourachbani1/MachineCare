import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import seedDefaultUser from './config/seedUser.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'MachineCare API is live!' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  await seedDefaultUser();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});