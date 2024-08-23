//externalApiRoutes.js contains all the routes for the external APIs.
import express from 'express';
import { promptQuestion } from '../controllers/openAiController.js';
import { getWeather } from '../controllers/weatherController.js';
import { THIRD_PARTY_APIS } from './paths.js';

// Create a new router
const router = express.Router();

// External API routes
router.get(THIRD_PARTY_APIS.getWeather, getWeather);
router.get(THIRD_PARTY_APIS.promptQuestion, promptQuestion);

export default router;
