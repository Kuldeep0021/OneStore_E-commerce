import express from 'express';
import Setting from '../models/Setting.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    
    // If no settings exist yet, create default settings automatically
    if (!settings) {
      settings = await Setting.create({});
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
  try {
    let settings = await Setting.findOne();
    
    if (!settings) {
      settings = new Setting();
    }
    
    settings.email = req.body.email || settings.email;
    settings.phone = req.body.phone || settings.phone;
    settings.address = req.body.address || settings.address;
    settings.privacyPolicy = req.body.privacyPolicy || settings.privacyPolicy;
    settings.refundPolicy = req.body.refundPolicy || settings.refundPolicy;
    settings.shippingPolicy = req.body.shippingPolicy || settings.shippingPolicy;
    settings.termsOfService = req.body.termsOfService || settings.termsOfService;
    
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
