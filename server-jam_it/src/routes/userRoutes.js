// src/routes/userRoutes.js
import { Router } from 'express';
import { getUser, getUserById, uploadPhoto } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';


const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['musician', 'venue']), getUser);
router.get('/:id', authenticateToken(['musician', 'venue']), getUserById);
// router.post("/upload-photo", authenticateToken(['user']), uploadFileMiddleware, uploadPhoto);

export default router;
