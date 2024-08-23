//photoRoutes.js handles all the routes for the photo feature
import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { create, getAll, remove } from '../controllers/photoController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { buildPathWithBase, PHOTO_PATHS } from './paths.js';

// Create a new router
const router = express.Router({ mergeParams: true });

// Build the photo path base
const photoPathBase = buildPathWithBase(PHOTO_PATHS);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'media/dogs';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Photo routes
router.post(photoPathBase.create, authenticate, upload.single('photo'), create);
router.get(photoPathBase.getAll, authenticate, getAll);
router.delete(photoPathBase.remove, authenticate, remove);

export default router;
