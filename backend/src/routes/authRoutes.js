// authRoutes.js contains all the routes related to authentication.
import express from 'express';
import { register, login } from '../controllers/authController.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { AUTH_PATHS, buildPathWithBase } from './paths.js';

// Create a new router
const router = express.Router();

// Build the auth path base
const authPathBase = buildPathWithBase(AUTH_PATHS);

// Register and login routes
router.post(AUTH_PATHS.register, schemaValidator(authPathBase.register), register);

// Login route
router.post(AUTH_PATHS.login, schemaValidator(authPathBase.login), login);

export default router;
