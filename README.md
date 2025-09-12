#  Task Manager API

API REST para la gestión de tareas con autenticación de usuarios, desarrollada con **Node.js, Express, TypeScript, MongoDB y JWT**.

---

##  Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-validator](https://express-validator.github.io/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) (documentación interactiva)

---

##  Estructura del proyecto

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

1️ Clonar el repositorio
git clone <url-del-repo>
cd task-manager-api

2️ Instalar dependencias
npm install

3️ Configurar variables de entorno

cp .env.example .env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/taskdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d

4️ Ejecutar el servidor en modo desarrollo
npm run dev

Endpoints principales
 Autenticación

POST /api/auth/register → Registro de usuario

POST /api/auth/login → Login de usuario (devuelve JWT)

 Tareas

(requieren autenticación con Authorization: Bearer <token>)

POST /api/tasks → Crear una nueva tarea

GET /api/tasks → Listar todas las tareas del usuario

GET /api/tasks/:id → Obtener una tarea por ID

PUT /api/tasks/:id → Actualizar una tarea

DELETE /api/tasks/:id → Eliminar una tarea

 Documentación Swagger

La documentación interactiva está disponible en:

 http://localhost:3000/api-docs

Desde allí puedes probar todos los endpoints directamente e incluso añadir tu JWT en el botón Authorize.

 Scripts disponibles

npm run dev → Ejecuta el servidor en modo desarrollo con hot reload.

npm run build → Compila TypeScript a JavaScript en dist/.

npm start → Ejecuta la versión compilada (dist/index.js).

 Video de demostración

En el video se debe mostrar:

La estructura del proyecto en VSCode.

Cómo levantar la API (npm run dev).

Ejemplo de registro/login de usuario en Postman.

Uso del JWT para crear y listar tareas.

Navegación en la documentación de Swagger (/api-docs).