// app.js is the entry point for the backend server. It sets up the Express app and defines the routes for the API endpoints. The app uses the cors middleware to allow requests from the React app running on localhost:3000. It also uses the authenticate middleware to authenticate requests using JWT tokens.
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import dogRoutes from './routes/dogRoutes.js';
import externalApiRoutes from './routes/externalApiRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import {
  AUTH_PATHS,
  DOG_PATHS,
  DOG_POTENTIAL_MATES_PATHS,
  THIRD_PARTY_APIS,
  USER_PATHS,
  MATCH_PATHS,
  buildPathWithBase
} from './routes/paths.js';
import photoRoutes from './routes/photoRoutes.js';
import potentialMatesRoutes from './routes/potentialMatesRoutes.js';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Create an Express app
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000' // Allow only the React app to make requests
  })
);

// Define base paths for different routes
const dogPathBase = buildPathWithBase(DOG_PATHS);

// Serve static files from the 'media' and 'images/dogs' directories
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/images/dogs', express.static(path.join(__dirname, '/images/dogs')));

app.use(express.json());
app.use(authenticate);
app.use(AUTH_PATHS.base, authRoutes);
app.use(`${dogPathBase.getOne}/photos`, photoRoutes);
app.use(DOG_PATHS.base, dogRoutes);
app.use(DOG_POTENTIAL_MATES_PATHS.base, potentialMatesRoutes);
app.use(USER_PATHS.base, userRoutes);
app.use(THIRD_PARTY_APIS.base, externalApiRoutes);
app.use(MATCH_PATHS.base, matchRoutes);

export default app;
