# Testing Documentation

## Setup Testing

Project ini sudah dilengkapi dengan testing framework menggunakan **Jest** dan **Supertest** untuk API testing.

## Struktur Testing

```
/vercel/sandbox/
├── tests/
│   ├── setup.js           # Test setup dan konfigurasi
│   ├── app.test.js        # Test untuk health check
│   ├── user.test.js       # Test untuk User API
│   ├── camera.test.js     # Test untuk Camera API
│   ├── history.test.js    # Test untuk History API
│   └── gdrive.test.js     # Test untuk Google Drive API
├── jest.config.js         # Konfigurasi Jest
└── .env.test              # Environment variables untuk testing
```

## Menjalankan Test

### 1. Test Semua File
```bash
npm test
```

### 2. Test dengan Watch Mode (auto-reload saat ada perubahan)
```bash
npm run test:watch
```

### 3. Test dengan Coverage Report
```bash
npm run test:coverage
```

### 4. Test dengan Verbose Output
```bash
npm run test:verbose
```

## Konfigurasi Database untuk Testing

File `app/config/dbconfig.js` sudah dikonfigurasi untuk environment `test`:

```javascript
const test = {
    host: process.env.DB_HOST || "127.0.0.1",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "test_database",
    dialect: "mysql",
    logging: false
}
```

### Setup Database Test (Opsional)

Jika Anda ingin menggunakan database MySQL untuk testing:

1. Buat database test:
```sql
CREATE DATABASE test_database;
```

2. Update file `.env.test` dengan kredensial database Anda:
```env
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=test_database
```

## Endpoint yang Ditest

### User API (`/api/v1/user`)
- ✅ `GET /api/v1/user/list/all` - List semua user
- ✅ `POST /api/v1/user/register/submit` - Register user baru
- ✅ `POST /api/v1/user/login` - Login user
- ✅ `POST /api/v1/user/login/session` - Check session
- ✅ `GET /api/v1/user/register/koordinator` - Get koordinator

### Camera API (`/api/v1/camera`)
- ✅ `POST /api/v1/camera` - Upload foto dari camera

### History API (`/api/v1/history`)
- ✅ `GET /api/v1/history` - Get history data

### Google Drive API (`/api/v1/upload_gdrive`)
- ✅ `POST /api/v1/upload_gdrive` - Upload ke Google Drive

## Contoh Test Case

### Test User Login
```javascript
describe('POST /api/v1/user/login', () => {
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
```

## Menambahkan Test Baru

1. Buat file test baru di folder `tests/`:
```javascript
const request = require('supertest');
const express = require('express');

describe('Your API Endpoint', () => {
  let app;

  beforeAll(() => {
    // Setup app
  });

  test('should do something', async () => {
    const response = await request(app).get('/your-endpoint');
    expect(response.status).toBe(200);
  });
});
```

2. Jalankan test:
```bash
npm test
```

## Tips Testing

1. **Mock Database**: Untuk test yang lebih cepat, gunakan mock database atau in-memory database
2. **Isolasi Test**: Pastikan setiap test independen dan tidak bergantung pada test lain
3. **Clean Up**: Gunakan `afterEach` atau `afterAll` untuk membersihkan data test
4. **Test Data**: Gunakan data dummy yang konsisten untuk testing

## Troubleshooting

### Error: Cannot connect to database
- Pastikan MySQL server berjalan
- Periksa kredensial di `.env.test`
- Atau gunakan mock database untuk testing

### Error: Port already in use
- Test menggunakan in-memory app, tidak perlu start server
- Jika ada konflik, ubah port di konfigurasi test

### Test timeout
- Increase timeout di `jest.config.js`:
```javascript
testTimeout: 30000 // 30 detik
```

## Coverage Report

Setelah menjalankan `npm run test:coverage`, Anda akan mendapatkan report di folder `coverage/`:

```
coverage/
├── lcov-report/
│   └── index.html    # Buka file ini di browser
└── coverage-summary.json
```

## CI/CD Integration

Untuk integrasi dengan CI/CD (GitHub Actions, GitLab CI, dll):

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '22'
      - run: npm install
      - run: npm test
```

## Best Practices

1. ✅ Tulis test untuk setiap endpoint baru
2. ✅ Test happy path dan error cases
3. ✅ Gunakan descriptive test names
4. ✅ Keep tests simple dan readable
5. ✅ Run tests sebelum commit
6. ✅ Maintain test coverage > 70%

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)
