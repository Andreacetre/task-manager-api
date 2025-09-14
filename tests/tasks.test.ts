
import request from 'supertest';
import app from '../src/app';

describe('Tasks API', () => {
  let token: string;
  let taskId: string;

  beforeAll(async () => {
    // Registrar usuario de prueba
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'taskuser@example.com', password: '123456*' });

    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'taskuser@example.com', password: '123456*' });

    token = res.body.token;
  });

  it('debería crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Prueba Jest', description: 'Test de integración', status: 'pending' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    taskId = res.body._id;
  });

  it('debería obtener todas las tareas', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería actualizar una tarea', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });

  it('debería eliminar una tarea', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
