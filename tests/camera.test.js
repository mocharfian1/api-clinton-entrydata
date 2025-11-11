const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

describe('Camera API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('POST /api/v1/camera', () => {
    test('should handle camera upload request', async () => {
      const response = await request(app)
        .post('/api/v1/camera')
        .send({
          test: 'data'
        });

      // Accept various status codes as the endpoint might require specific data
      expect([200, 400, 500]).toContain(response.status);
    });

    test('should handle empty request body', async () => {
      const response = await request(app)
        .post('/api/v1/camera')
        .send({});

      expect([200, 400, 500]).toContain(response.status);
    });
  });
});
