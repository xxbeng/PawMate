// Definition: Validation schema for dog create and update forms
import * as yup from 'yup';

// Yup validation schema for dog create form
export const dogCreateSchema = yup.object().shape({
  name: yup.string().required(),
  breed: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  weight: yup.number().required(),
  bio: yup.string().optional(),
  neutered: yup.boolean().required()
});

// Yup validation schema for dog update form
export const dogUpdateSchema = yup.object().shape({
  name: yup.string(),
  breed: yup.string(),
  dob: yup.date(),
  gender: yup.string(),
  weight: yup.number(),
  bio: yup.string(),
  neutered: yup.boolean()
});
