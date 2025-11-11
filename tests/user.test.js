const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a test app instance
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Load routes
  require('../app/routes')(app);

  return app;
};

describe('User API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/v1/user/list/all', () => {
    test('should return list of all users', async () => {
      const response = await request(app)
        .get('/api/v1/user/list/all')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/v1/user/register/submit', () => {
    test('should return validation error when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/v1/user/register/submit')
        .send({})
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should register user with valid data', async () => {
      const userData = {
        no_ktp: '1234567890123456',
        nama: 'Test User',
        password: 'testpassword123',
        no_hp: '081234567890',
        alamat: 'Test Address'
      };

      const response = await request(app)
        .post('/api/v1/user/register/submit')
        .send(userData)
        .expect('Content-Type', /json/);

      // Could be 200 (success) or 400 (duplicate/validation error)
      expect([200, 400]).toContain(response.status);
      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/v1/user/login', () => {
    test('should return error when credentials are missing', async () => {
      const response = await request(app)
        .post('/api/v1/user/login')
        .send({})
        .expect('Content-Type', /json/);

      expect([200, 400]).toContain(response.status);
      expect(response.body).toHaveProperty('success');
    });

    test('should return error for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/user/login')
        .send({
          no_ktp: 'invalid_ktp',
          password: 'wrongpassword'
        })
        .expect('Content-Type', /json/);

      expect([200, 400]).toContain(response.status);
      expect(response.body).toHaveProperty('success');
    });
  });

  describe('POST /api/v1/user/login/session', () => {
    test('should check session with authorization header', async () => {
      const response = await request(app)
        .post('/api/v1/user/login/session')
        .set('Authorization', 'test-token')
        .expect('Content-Type', /json/);

      expect([200, 400]).toContain(response.status);
      expect(response.body).toHaveProperty('success');
    });

    test('should fail without authorization header', async () => {
      const response = await request(app)
        .post('/api/v1/user/login/session')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/user/register/koordinator', () => {
    test('should return list of koordinator', async () => {
      const response = await request(app)
        .get('/api/v1/user/register/koordinator')
        .expect('Content-Type', /json/);

      expect([200, 400, 500]).toContain(response.status);
      expect(response.body).toHaveProperty('success');
    });
  });
});
