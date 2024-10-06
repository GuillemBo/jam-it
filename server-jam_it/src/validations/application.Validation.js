// src/validations/application.Validation.js
import { body, check } from 'express-validator';

export const applicationValidator = [
  // Validar el campo "group_id"
  body('group_id')
    .exists()
    .withMessage('Group ID is required')
    .isInt({ min: 1 })
    .withMessage('Group ID must be a positive integer'),

  // Validar el campo "event_id"
  body('event_id')
    .exists()
    .withMessage('Event ID is required')
    .isInt({ min: 1 })
    .withMessage('Event ID must be a positive integer'),

  // Validar el campo "titulodeloquehago"
  body('titulodeloquehago')
    .exists()
    .withMessage('Title of the application is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),

  // Validar el campo "descriptiondeloquehago"
  body('descriptiondeloquehago')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];

export const applicationStatusValidator = [
  // Validar el estado "status"
  body('status')
    .exists()
    .withMessage('Status is required')
    .isIn(['pending', 'accepted', 'rejected'])
    .withMessage('Status must be one of the following: pending, accepted, rejected'),
];

// Validación para los parámetros de la ruta que contienen el ID
export const applicationIdValidator = [
  check('id')
    .exists()
    .withMessage('Application ID is required')
    .isInt({ min: 1 })
    .withMessage('Application ID must be a positive integer'),
];
