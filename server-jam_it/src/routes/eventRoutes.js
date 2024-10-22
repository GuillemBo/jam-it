import { Router } from 'express';
import { getEvents, getEventById, addEvent, updateEvent, deleteEvent, getEventsWithApplications } from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { eventValidator } from '../validations/event.Validation.js';
import { idValidator } from '../validations/generic.Validation.js';

const router = Router();

// Rutas para obtener y modificar los datos de los eventos
router.get('/', authenticateToken(['musician', 'venue']), getEvents);
router.get('/applications', authenticateToken(['venue']), getEventsWithApplications);
router.get('/:id', authenticateToken(['musician', 'venue']), idValidator, getEventById);
router.post('/', authenticateToken(['venue']), eventValidator, addEvent);
router.patch('/:id', authenticateToken(['musician', 'venue']), idValidator, eventValidator, updateEvent);
router.delete('/:id', authenticateToken(['venue']), idValidator, deleteEvent);

export default router;
