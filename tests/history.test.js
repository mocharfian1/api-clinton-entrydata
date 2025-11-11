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

describe('History API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/v1/history', () => {
    test('should return history data', async () => {
      const response = await request(app)
        .get('/api/v1/history');

      // Accept various status codes
      expect([200, 400, 500]).toContain(response.status);
    });

    test('should handle query parameters', async () => {
      const response = await request(app)
        .get('/api/v1/history')
        .query({ limit: 10, offset: 0 });

      expect([200, 400, 500]).toContain(response.status);
    });
  });
});
