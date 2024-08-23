// Validating the user profile form
import Joi from 'joi';

export const userProfileSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  address: Joi.string().required(),
  phone: Joi.string().allow('', null).optional(),
  latitude: Joi.number().precision(8).required(),
  longitude: Joi.number().precision(8).required(),
  aboutMe: Joi.string().required()
});
