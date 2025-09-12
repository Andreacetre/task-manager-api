import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: paola@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: El email ya está registrado
 */
router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validateRequest,
  register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: paola@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso (devuelve JWT)
 *       400:
 *         description: Credenciales inválidas
 */
router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  validateRequest,
  login
);

export default router;
