import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import analyzeRoutes from './routes/analyzeRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 50 }));

app.use('/api', analyzeRoutes);
app.use(errorHandler);

// MongoDB skipped temporarily
app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on port ${process.env.PORT}`)
);