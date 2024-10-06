// src/routes/applicationRoutes.js
import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/applicationController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { applicationValidator, applicationStatusValidator, applicationIdValidator } from '../validations/application.Validation.js';

const router = Router();

// Rutas para manejar las aplicaciones (inscripciones) de grupos a eventos

// Obtener todas las aplicaciones
router.get('/', authenticateToken(['mod', 'admin']), getApplications);

// Obtener una aplicación por ID
router.get('/:id', authenticateToken(['user', 'mod', 'admin']), applicationIdValidator, getApplicationById);

// Crear una nueva aplicación (grupo se inscribe a un evento)
router.post('/', authenticateToken(['user']), applicationValidator, createApplication);

// Actualizar el estado de una aplicación
router.patch('/:id/status', authenticateToken(['mod', 'admin']), applicationIdValidator, applicationStatusValidator, updateApplicationStatus);

// Eliminar una aplicación
router.delete('/:id', authenticateToken(['admin']), applicationIdValidator, deleteApplication);

export default router;
