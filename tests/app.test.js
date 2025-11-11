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

  // Basic health check route
  app.get('/', (req, res) => {
    res.send('Hello World! Version 1.1');
  });

  // Load routes
  require('../app/routes')(app);

  return app;
};

describe('API Health Check', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  test('GET / should return Hello World message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello World');
  });
});
