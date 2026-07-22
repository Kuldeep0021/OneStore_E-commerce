import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') return res.status(400).json({ message: 'Valid email is required' });

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already subscribed' });

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
