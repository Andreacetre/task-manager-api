
import request from 'supertest';
import app from '../src/app';
import User from '../src/models/User';

jest.setTimeout(30000); // 30 segundos

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  let token: string;

  it('debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@example.com', password: '123456*' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
  });

  it('debería iniciar sesión y devolver un token JWT', async () => {
    // Registrar usuario antes de login
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@example.com', password: '123456*' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: '123456*' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('no debería loguear con credenciales incorrectas', async () => {
    // Registrar usuario antes de login incorrecto
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@example.com', password: '123456*' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'wrongpass' });

    expect(res.status).toBe(400);
  });
});
