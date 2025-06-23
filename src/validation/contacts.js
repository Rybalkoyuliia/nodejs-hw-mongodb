import Joi from 'joi';
import { contactTypes } from '../constants/validationConstants.js';
import { enumMessage, strFieldsMessage } from '../utils/joiMessages.js';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(strFieldsMessage('Name')),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(strFieldsMessage('Phone number')),
  email: Joi.string()
    .email()
    .min(3)
    .max(20)
    .messages({
      ...strFieldsMessage('Email'),
      'string.email': 'Email must be a valid email address.',
    }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...contactTypes)
    .default('personal')
    .messages(enumMessage('Contact type', contactTypes)),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(strFieldsMessage('Name')),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .messages(strFieldsMessage('Phone number')),
  email: Joi.string()
    .email()
    .min(3)
    .max(20)
    .messages({
      ...strFieldsMessage('Email'),
      'string.email': 'Email must be a valid email address.',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypes)
    .default('personal')
    .messages(enumMessage('Contact type', contactTypes)),
});
