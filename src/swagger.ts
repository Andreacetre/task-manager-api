// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestión de tareas con autenticación y autorización',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' },
      { url: 'https://task-manager-api-iup0.onrender.com', description: 'Servidor en Render' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // busca los JSDoc en las rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
