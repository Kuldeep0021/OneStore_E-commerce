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

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(antiBot);

// Global rate limiter (100 requests per 15 minutes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { message: 'Too many requests, please try again later.' }
});

// Strict rate limiter for auth (10 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
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


