// src/routes/userRoutes.js
import { Router } from 'express';
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup, getGroupsByUserId } from '../controllers/groupController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { groupValidator } from '../validations/group.Validation.js';
import { groupIdValidator } from '../validations/group.Validation.js';
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['musician', 'venue']), getGroups);
router.get('/groups/:userId', authenticateToken(['musician']), getGroupsByUserId);
router.get('/:id', authenticateToken(['musician', 'venue']), groupIdValidator, getGroupById);
router.post('/', authenticateToken(['musician']), groupValidator, createGroup);
router.patch('/:id', authenticateToken(['musician']), groupIdValidator, groupValidator, updateGroup);
router.delete('/:id', authenticateToken(['musician']), groupIdValidator, deleteGroup);

export default router;
