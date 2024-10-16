import { body, check } from 'express-validator';

// Validación para eliminar a un músico de un grupo
export const groupMusicianValidator = [
  // Validar el campo "id_group"
  body('id_group')
    .exists()
    .withMessage('Group ID is required')
    .isInt({ min: 1 })
    .withMessage('Group ID must be a positive integer'),

  // Validar el campo "id_user"
  body('id_user')
    .exists()
    .withMessage('User ID is required')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
];