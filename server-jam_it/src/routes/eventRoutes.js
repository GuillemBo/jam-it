import { Router } from 'express';
import { getEvents, getEventById, addEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { eventValidator } from '../validations/event.Validation.js';
import { idValidator } from '../validations/generic.Validation.js';

const router = Router();

// Rutas para obtener y modificar los datos de los eventos
router.get('/', authenticateToken(['user', 'mod', 'admin']), getEvents);
router.get('/:id_event', authenticateToken(['user', 'mod', 'admin']), idValidator, getEventById);
router.post('/', authenticateToken(['user', 'mod', 'admin']), eventValidator, addEvent);
router.patch('/:id_event', authenticateToken(['user', 'mod', 'admin']), idValidator, eventValidator, updateEvent);
router.delete('/:id_event', authenticateToken(['user', 'mod', 'admin']), idValidator, deleteEvent);

export default router;
