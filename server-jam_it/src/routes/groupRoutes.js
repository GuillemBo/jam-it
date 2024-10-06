// src/routes/userRoutes.js
import { Router } from 'express';
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from '../controllers/groupController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { groupValidator } from '../validations/group.Validation.js';
import { groupIdValidator } from '../validations/group.Validation.js';
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['user', 'mod', 'admin']), getGroups);
router.get('/:id', authenticateToken(['user', 'mod', 'admin']), groupIdValidator, getGroupById);
router.post('/', authenticateToken(['mod', 'admin']), groupValidator, createGroup);
router.patch('/:id', authenticateToken(['mod', 'admin']), groupIdValidator, groupValidator, updateGroup);
router.delete('/:id', authenticateToken(['admin']), groupIdValidator, deleteGroup);

export default router;
