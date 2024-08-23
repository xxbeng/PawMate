// dogRoutes.js contains all the routes related to dogs.
import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getOthers,
  getOneOther
} from '../controllers/dogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { buildPathWithBase, DOG_PATHS } from './paths.js';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'media/dogs';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the date and the original extension to the filename
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Create a new router
const router = express.Router();

// Build the dog path base
const dogPathBase = buildPathWithBase(DOG_PATHS);

// Dog routes
router.post(DOG_PATHS.create, authenticate, schemaValidator(dogPathBase.create), create);
router.get(DOG_PATHS.getAll, authenticate, getAll);
router.get(DOG_PATHS.getOne, authenticate, getOne);
router.put(
  DOG_PATHS.update,
  authenticate,
  schemaValidator(dogPathBase.update),
  upload.single('profilePicture'),
  update
);
router.delete(DOG_PATHS.remove, authenticate, remove);
router.get(DOG_PATHS.getOthers, authenticate, getOthers);
router.get(DOG_PATHS.getOneOther, authenticate, getOneOther);

export default router;
