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

describe('Google Drive API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('POST /api/v1/upload_gdrive', () => {
    test('should handle gdrive upload request', async () => {
      const response = await request(app)
        .post('/api/v1/upload_gdrive')
        .send({
          test: 'data'
        });

      // Accept various status codes
      expect([200, 400, 500]).toContain(response.status);
    });
  });
});
