// backend/index.ts
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import capsuleRoutes from './routes/capsuleRoutes';



const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', capsuleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
