import { Router } from 'express';
import { addMusicianToGroup, getGroupsByUserId, deleteMusicianFromGroup } from '../controllers/groupMusicianController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { groupMusicianValidator } from '../validations/groupMusician.Validation.js';

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/groups', authenticateToken(['musician', 'venue']), getGroupsByUserId);
router.post('/remove-musician', authenticateToken(['musician']), deleteMusicianFromGroup);
router.post('/add-musician', authenticateToken(['musician']), groupMusicianValidator, addMusicianToGroup);

export default router;
