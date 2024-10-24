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

router.get('/', authenticateToken(['musician', 'venue']), getApplications);
router.get('/:id', authenticateToken(['musician', 'venue']), applicationIdValidator, getApplicationById);
router.post('/', authenticateToken(['musician']), applicationValidator, createApplication);
router.put('/:id/status', authenticateToken(['venue']), applicationIdValidator, applicationStatusValidator, updateApplicationStatus);
router.delete('/:id', authenticateToken(['musician', 'venue']), applicationIdValidator, deleteApplication);

export default router;
