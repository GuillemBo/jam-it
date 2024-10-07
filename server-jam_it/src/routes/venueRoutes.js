// src/routes/userRoutes.js
import { Router } from 'express';
import { getVenues, getVenueById, createVenue, updateVenue, deleteVenue  } from '../controllers/venueController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { venueValidator } from '../validations/venue.Validation.js';
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['musician', 'venue']), getVenues);
router.get('/:id', authenticateToken(['musician', 'venue']), idValidator, getVenueById);
router.post('/', authenticateToken(['venue']), venueValidator, createVenue);
router.patch('/:id', authenticateToken(['venue']), idValidator, venueValidator, updateVenue);
router.delete('/:id', authenticateToken(['venue']), idValidator, deleteVenue);

export default router;
