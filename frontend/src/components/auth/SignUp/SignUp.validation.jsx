// Sign up form validation schema
import Joi from 'joi';

// Joi validation schema for the sign up form
export const signupSchema = Joi.object({
  aboutMe: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match'
  }),
  email: Joi.string().email({ tlds: false }).required(),
  address: Joi.string().required(),
  latitude: Joi.number().precision(8).required(),
  longitude: Joi.number().precision(8).required(),
  phone: Joi.string().allow('', null).optional()
});
