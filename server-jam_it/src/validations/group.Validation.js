import { body, check } from 'express-validator';

// Validación para crear o actualizar un grupo
export const groupValidator = [
  // Validar el campo "id_user"
  body('id_user')
    .exists()
    .withMessage('User ID is required')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),

  // Validar el campo "name"
  body('name')
    .exists()
    .withMessage('Group name is required')
    .isString()
    .withMessage('Group name must be a string')
    .isLength({ min: 3 })
    .withMessage('Group name must be at least 3 characters long'),
];

// Validación para la ruta que recibe el ID del grupo en los parámetros
export const groupIdValidator = [
  check('id')
    .exists()
    .withMessage('Group ID is required')
    .isInt({ min: 1 })
    .withMessage('Group ID must be a positive integer'),
];
