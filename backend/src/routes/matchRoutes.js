// matchRoutes.js will handle all the routes for the match feature
import express from 'express';
import { match, friends, unfriend } from '../controllers/matchController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { MATCH_PATHS } from './paths.js';

// Create a new router
const router = express.Router();

// Match routes
router.post(MATCH_PATHS.match, authenticate, match);
router.get(MATCH_PATHS.friends, authenticate, friends);
router.delete(MATCH_PATHS.unfriend, authenticate, unfriend);

export default router;
