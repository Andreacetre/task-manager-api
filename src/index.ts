import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import cors from 'cors';

dotenv.config();

const app = express();

// Middlewares globales
app.use(express.json());

// Configuración de CORS: solo permite local y Render
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://task-manager-api-iup0.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de errores (después de todas las rutas)
app.use(errorHandler);

// Puerto y conexión a DB
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
