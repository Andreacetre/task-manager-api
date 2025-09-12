import { Router } from 'express';
import { body, param } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware';
import validateRequest from '../middlewares/validateRequest';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para la gestión de tareas
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Estudiar Node.js"
 *               description:
 *                 type: string
 *                 example: "Repasar middlewares"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-12"
 *     responses:
 *       201:
 *         description: Tarea creada con éxito
 */
router.post(
  '/',
  [body('title').notEmpty().withMessage('El título es obligatorio')],
  validateRequest,
  createTask
);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Listar todas las tareas del usuario autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', [param('id').isMongoId()], validateRequest, getTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, done]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id', [param('id').isMongoId()], validateRequest, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', [param('id').isMongoId()], validateRequest, deleteTask);

export default router;
