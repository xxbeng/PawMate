// schemaValidations.js is a file that contains all the schema validations for the different routes in the application.
import Joi from 'joi';
import { AUTH_PATHS, buildPathWithBase, DOG_PATHS } from '../routes/paths.js';
const authPathBase = buildPathWithBase(AUTH_PATHS);
const dogPathBase = buildPathWithBase(DOG_PATHS);

// Define Joi schema validations for different routes
const registerSchema = Joi.object({
  aboutMe: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  latitude: Joi.number().precision(8).required(),
  longitude: Joi.number().precision(8).required(),
  phone: Joi.string().allow('', null).optional()
});

// Define Joi schema validations for different routes
const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

// Define Joi schema validations for different routes
const createDogSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string().required(),
  dob: Joi.date().optional(),
  gender: Joi.string().required(),
  weight: Joi.number().required(),
  bio: Joi.string().required(),
  neutered: Joi.boolean().required(),
  profilePicture: Joi.string().uri().optional()
});

// Define Joi schema validations for different routes
const updateDogSchema = Joi.object({
  name: Joi.string().optional(),
  breed: Joi.string().optional(),
  dob: Joi.date().optional(),
  gender: Joi.string().optional(),
  weight: Joi.number().optional(),
  bio: Joi.string().optional(),
  neutered: Joi.boolean().optional(),
  profilePicture: Joi.string().uri().optional()
});

// Export the schema validations
export default {
  [authPathBase.login]: loginSchema,
  [authPathBase.register]: registerSchema,
  [dogPathBase.create]: createDogSchema,
  [dogPathBase.update]: updateDogSchema
};
