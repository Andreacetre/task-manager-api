# Task Manager API

API REST para la gestión de tareas con autenticación de usuarios, desarrollada con **Node.js, Express, TypeScript, MongoDB y JWT**.

---
## Índice
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y configuración](#instalación-y-configuración)
- [Endpoints principales](#endpoints-principales)
- [Documentación Swagger](#documentación-swagger)
- [Scripts disponibles](#scripts-disponibles)
- [Despliegue en Render](#despliegue-en-render)
- [Cambios importantes](#cambios-importantes)
- [Pruebas con Postman](#pruebas-con-postman)
- [Prompts de IA utilizados](#prompts-de-ia-utilizados)
- [Historial de commits](#historial-de-commits)
- [Buenas prácticas](#buenas-prácticas)
- [Asistencia con IA](#asistencia-con-ia)

## Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-validator](https://express-validator.github.io/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) (documentación interactiva)

---

## Estructura del proyecto

```plaintext
task-manager-api/
├─ src/
│  ├─ config/          # Configuración de la base de datos
│  ├─ controllers/     # Lógica de negocio (auth y tasks)
│  ├─ middlewares/     # Autenticación, validaciones, manejo de errores
│  ├─ models/          # Modelos de MongoDB (User, Task)
│  ├─ routes/          # Definición de rutas de la API
│  ├─ swagger.ts       # Configuración de Swagger
│  └─ index.ts         # Punto de entrada de la app
├─ .env.example        # Variables de entorno de ejemplo
├─ package.json
└─ README.md

Instalación y configuración
1* Clonar el repositorio:
git clone https://github.com/Andreacetre/task-manager-api.git
 cd task-manager-api

2️* Instalar dependencias
npm install

3️* Configurar variables de entorno

Copia el archivo de ejemplo:

cp .env.example .env


Configura tus variables:

PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/taskdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d


4️* Ejecutar el servidor en modo desarrollo
npm run dev

El servidor se levantará en http://localhost:3000.

Endpoints principales

Autenticación

POST /api/auth/register → Registro de usuario

POST /api/auth/login → Login de usuario (devuelve JWT)

Tareas (requieren JWT en Authorization: Bearer <token>)

POST /api/tasks → Crear una nueva tarea

GET /api/tasks → Listar todas las tareas del usuario

GET /api/tasks/:id → Obtener una tarea por ID

PUT /api/tasks/:id → Actualizar una tarea

DELETE /api/tasks/:id → Eliminar una tarea

Documentación Swagger

URL: http://localhost:3000/api-docs
Producción (Render): https://task-manager-api-iup0.onrender.com/api-docs

Permite probar todos los endpoints directamente y usar el JWT con el botón Authorize.

Scripts disponibles
npm run dev   # Ejecuta el servidor en modo desarrollo con hot reload
npm run build # Compila TypeScript a JavaScript en dist/
npm start     # Ejecuta la versión compilada (dist/index.js)

Despliegue en Render

La API está desplegada en:
https://task-manager-api-iup0.onrender.com

Endpoints de ejemplo:

Registro: POST https://task-manager-api-iup0.onrender.com/api/auth/register

Login: POST https://task-manager-api-iup0.onrender.com/api/auth/login

Tareas: GET https://task-manager-api-iup0.onrender.com/api/tasks

Cambios importantes

 Se realizó una modificación en authController.ts para organizar la compilación y asegurar que el proyecto pueda ejecutarse correctamente en las tres rutas:

npm run dev → ejecución en desarrollo con recarga automática.

npm run build → genera el directorio dist/ con los archivos compilados (models, controllers, routes, config, index, swagger en formato .js).

npm start → corre el proyecto ya compilado desde dist/index.js.

Esto garantiza que el proyecto pueda usarse tanto en desarrollo como en producción sin errores de compilación.

Pruebas con Postman

Registrar usuario: POST /api/auth/register

Hacer login: POST /api/auth/login → Copiar el JWT

Usar JWT en Authorization: Bearer <token> para probar endpoints de tareas

Crear, listar, actualizar y eliminar tareas

Prompts de IA utilizados

"Crea un middleware de manejo de errores para Express con TypeScript"

"Genera types.d.ts para una API de tareas y usuarios"


## Historial de commits

- feat(auth): agregar registro e inicio de sesión con JWT  
- feat(tasks): crear endpoints CRUD de tareas  
- fix(middleware): corregir manejo de errores en errorHandler  
- docs(readme): agregar instrucciones de instalación y uso  
- docs(swagger): agregar configuración de Swagger y documentación de endpoints  
- chore: agregar archivos de configuración y estructura general  
- chore(deploy): configurar proyecto para despliegue en Render  
- refactor(authController): organizar lógica y manejo de JWT  
- refactor(routes): separar rutas de auth y tasks  
- test(api): agregar colección de pruebas en Postman  



Buenas prácticas

Código limpio y modular siguiendo MVC (Models, Controllers, Routes).

Manejo de errores centralizado con middlewares.

Validación de datos con express-validator.

Uso de TypeScript para tipado fuerte y seguridad en desarrollo.

Documentación automática con Swagger.

Preparado para desarrollo (dev) y producción (build/start).

## Prompts de IA utilizados

- "Crea un middleware de manejo de errores para Express con TypeScript."
- "Genera types.d.ts para una API de tareas y usuarios."
- "Agrega documentación Swagger con JSDoc para los endpoints de autenticación y tareas."
- "Explica cómo configurar npm run dev, npm run build y npm start en un proyecto con TypeScript."

## Pruebas y cobertura

Este proyecto incluye **pruebas unitarias y de integración** usando **Jest** y **Supertest**.

### Ejecutar tests

Para correr todos los tests:
npm test

Para correr tests en modo interactivo (watch):

npm run test:watch

Cobertura de código

Para generar el reporte de cobertura:

npm test -- --coverage

Esto mostrará un resumen en consola y creará un reporte detallado en coverage/lcov-report/index.html.

Qué se prueba
Auth API

Registro de usuarios

Inicio de sesión y obtención de JWT

Manejo de credenciales incorrectas

Tasks API

Creación de tareas

Listado de tareas

Actualización de tareas

Eliminación de tareas

Utils

Hash de contraseñas con bcrypt

Encriptación

Validación de contraseñas correctas e incorrectas

Consideraciones

Las pruebas se ejecutan contra la base de datos definida en .env (MONGO_URI).

Se recomienda usar una base de datos de pruebas para no afectar datos reales.

Los tests de integración usan JWT dinámico para probar endpoints protegidos.