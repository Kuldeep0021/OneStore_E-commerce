import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary storage. 
// It automatically picks up the CLOUDINARY_URL environment variable.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'onestore',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// Allow up to 10 images at once
router.post('/', protect, admin, upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // With CloudinaryStorage, file.path is the full secure URL to the image on Cloudinary
  const filePaths = req.files.map((file) => file.path);
  
  res.json({ paths: filePaths, message: 'Images uploaded successfully' });
});

export default router;
