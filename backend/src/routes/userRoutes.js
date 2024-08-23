// userRoutes.js handles all the routes for the user feature
import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { USER_PATHS } from './paths.js';

// Create a new router
const router = express.Router();

// User routes
router.get(USER_PATHS.getUser, authenticate, getUser);
router.put(USER_PATHS.updateUser, authenticate, updateUser);

export default router;
