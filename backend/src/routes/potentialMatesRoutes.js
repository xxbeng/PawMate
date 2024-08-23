// potentiallyMatesRoutes.js handles all the routes for the potential mates feature
import express from 'express';
import { getAllOthers } from '../controllers/dogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { DOG_POTENTIAL_MATES_PATHS } from './paths.js';

// Create a new router
const router = express.Router();

// Potential mates routes
router.get(DOG_POTENTIAL_MATES_PATHS.getAll, authenticate, getAllOthers);

export default router;
