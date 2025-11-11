# API Testing Guide

## Quick Start

```bash
# Install dependencies (sudah dilakukan)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Results

Saat ini test sudah berjalan dengan hasil:
- ✅ **8 tests passed**
- ⚠️ **6 tests failed** (karena database connection)

## Cara Testing Manual dengan cURL

### 1. Health Check
```bash
curl http://localhost:3000/
```

### 2. Get All Users
```bash
curl http://localhost:3000/api/v1/user/list/all
```

### 3. Register User
```bash
curl -X POST http://localhost:3000/api/v1/user/register/submit \
  -H "Content-Type: application/json" \
  -d '{
    "no_ktp": "1234567890123456",
    "nama": "Test User",
    "password": "testpassword123",
    "no_hp": "081234567890",
    "alamat": "Test Address"
  }'
```

### 4. Login
```bash
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "no_ktp": "1234567890123456",
    "password": "testpassword123"
  }'
```

### 5. Check Session
```bash
curl -X POST http://localhost:3000/api/v1/user/login/session \
  -H "Authorization: YOUR_TOKEN_HERE"
```

### 6. Get Koordinator
```bash
curl http://localhost:3000/api/v1/user/register/koordinator
```

### 7. Get History
```bash
curl http://localhost:3000/api/v1/history
```

## Testing dengan Postman

1. Import collection dari file `postman_collection.json` (jika ada)
2. Atau buat request manual sesuai endpoint di atas
3. Set environment variables untuk token dan base URL

## Test Structure

```
tests/
├── setup.js          # Global test setup
├── app.test.js       # Basic health check tests
├── user.test.js      # User API tests (login, register, etc)
├── camera.test.js    # Camera upload tests
├── history.test.js   # History API tests
└── gdrive.test.js    # Google Drive upload tests
```

## Writing New Tests

### Template untuk Test Baru

```javascript
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create test app
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  require('../app/routes')(app);
  return app;
};

describe('Your Feature Tests', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /your/endpoint', () => {
    test('should return success', async () => {
      const response = await request(app)
        .get('/your/endpoint')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('POST /your/endpoint', () => {
    test('should create resource', async () => {
      const data = { name: 'test' };
      
      const response = await request(app)
        .post('/your/endpoint')
        .send(data)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
```

## Common Test Patterns

### 1. Testing Success Response
```javascript
test('should return success', async () => {
  const response = await request(app).get('/endpoint');
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
```

### 2. Testing Error Response
```javascript
test('should return error for invalid data', async () => {
  const response = await request(app)
    .post('/endpoint')
    .send({ invalid: 'data' });
  
  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});
```

### 3. Testing with Headers
```javascript
test('should require authorization', async () => {
  const response = await request(app)
    .get('/protected-endpoint')
    .set('Authorization', 'Bearer token123');
  
  expect(response.status).toBe(200);
});
```

### 4. Testing File Upload
```javascript
test('should upload file', async () => {
  const response = await request(app)
    .post('/upload')
    .attach('image', 'path/to/test-image.jpg');
  
  expect(response.status).toBe(200);
});
```

## Debugging Tests

### Run specific test file
```bash
npm test user.test.js
```

### Run specific test suite
```bash
npm test -- --testNamePattern="User API"
```

### Run with verbose output
```bash
npm run test:verbose
```

### Debug with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Mock Database (Optional)

Untuk test yang lebih cepat tanpa database:

```javascript
// tests/mocks/database.js
jest.mock('../models', () => ({
  UserModel: {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({ id: 1 }),
    findOne: jest.fn().mockResolvedValue(null)
  }
}));
```

## Environment Variables

Test menggunakan environment variables dari `.env.test`:

```env
NODE_ENV=test
PORT=3001
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=test_database
```

## Next Steps

1. ✅ Setup database test (opsional)
2. ✅ Tambahkan lebih banyak test cases
3. ✅ Implement mocking untuk database
4. ✅ Setup CI/CD untuk auto-testing
5. ✅ Tambahkan integration tests
6. ✅ Setup test coverage threshold

## Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi di `TESTING.md`
2. Review test examples di folder `tests/`
3. Check Jest documentation: https://jestjs.io/
