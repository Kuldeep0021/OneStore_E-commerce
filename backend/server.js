import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';

import { antiBot } from './middleware/antiBot.js';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/upload.js';
import newsletterRoutes from './routes/newsletter.js';
import userRoutes from './routes/user.js';
import settingRoutes from './routes/setting.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

// Trust proxy — required for Render and other reverse-proxy deployments
// Without this, express-rate-limit sees the proxy's IP for all users and blocks them
app.set('trust proxy', 1);

// Allow multiple frontend origins (localhost dev + Vercel production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined/null

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman in dev, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any Vercel domain (handles preview URLs too)
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(antiBot);

// Global rate limiter (200 requests per 15 minutes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

// Auth rate limiter (30 requests per 15 minutes — enough for real users, blocks bots)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' }
});

app.use('/api/', globalLimiter);

// Make uploads folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onestore').then(async () => {
  console.log('MongoDB connected');
  
  // Seed default admin
  const adminEmail = 'admin@onestore.com';
  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Default admin seeded');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});


