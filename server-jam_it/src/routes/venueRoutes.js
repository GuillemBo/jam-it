// src/routes/userRoutes.js
import { Router } from 'express';
import { getVenues, getVenueById, createVenue, updateVenue, deleteVenue  } from '../controllers/venueController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { venueValidator } from '../validations/venue.Validation.js';
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['user', 'mod', 'admin']), getVenues);
router.get('/:id', authenticateToken(['user', 'mod', 'admin']), idValidator, getVenueById);
router.post('/', authenticateToken(['mod', 'admin']), venueValidator, createVenue);
router.patch('/:id', authenticateToken(['mod', 'admin']), idValidator, venueValidator, updateVenue);
router.delete('/:id', authenticateToken(['admin']), idValidator, deleteVenue);

export default router;
