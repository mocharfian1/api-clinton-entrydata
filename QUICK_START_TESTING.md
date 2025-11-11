# 🚀 Quick Start - Testing Guide

## Langkah Cepat untuk Mulai Testing

### 1️⃣ Install Dependencies (Sudah Selesai ✅)
```bash
npm install
```

### 2️⃣ Jalankan Test
```bash
npm test
```

**Output yang diharapkan:**
```
Test Suites: 4 failed, 1 passed, 5 total
Tests:       6 failed, 8 passed, 14 total
```

### 3️⃣ Lihat Coverage Report
```bash
npm run test:coverage
```

Kemudian buka file: `coverage/lcov-report/index.html` di browser.

---

## 📱 Testing dengan Postman

### Import Collection
1. Buka Postman
2. Click **Import**
3. Pilih file `postman_collection.json`
4. Collection "Entry Data API" akan muncul

### Setup Environment
1. Klik icon ⚙️ (Settings) di Postman
2. Buat environment baru: "Development"
3. Tambahkan variable:
   - `base_url` = `http://localhost:3000`
   - `token` = (kosongkan dulu)

### Jalankan Request
1. Start server: `npm start`
2. Pilih request dari collection
3. Click **Send**

---

## 🧪 Testing Manual dengan cURL

### 1. Health Check
```bash
curl http://localhost:3000/
```

**Expected Response:**
```
Hello World! Version 1.1
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
    "no_ktp": "3201234567890123",
    "nama": "John Doe",
    "password": "password123",
    "no_hp": "081234567890",
    "alamat": "Jl. Test No. 123"
  }'
```

### 4. Login
```bash
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "no_ktp": "3201234567890123",
    "password": "password123"
  }'
```

**Save the token from response!**

### 5. Check Session
```bash
curl -X POST http://localhost:3000/api/v1/user/login/session \
  -H "Authorization: YOUR_TOKEN_HERE"
```

---

## 🎯 Skenario Testing

### Skenario 1: Test User Registration Flow
```bash
# 1. Register user baru
curl -X POST http://localhost:3000/api/v1/user/register/submit \
  -H "Content-Type: application/json" \
  -d '{"no_ktp":"1234567890123456","nama":"Test User","password":"test123","no_hp":"081234567890","alamat":"Test Address"}'

# 2. Login dengan user tersebut
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"no_ktp":"1234567890123456","password":"test123"}'

# 3. Verify user ada di list
curl http://localhost:3000/api/v1/user/list/all
```

### Skenario 2: Test Authentication
```bash
# 1. Login dan dapatkan token
TOKEN=$(curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"no_ktp":"1234567890123456","password":"test123"}' \
  | jq -r '.data.token')

# 2. Check session dengan token
curl -X POST http://localhost:3000/api/v1/user/login/session \
  -H "Authorization: $TOKEN"
```

### Skenario 3: Test Error Handling
```bash
# 1. Register dengan data tidak lengkap
curl -X POST http://localhost:3000/api/v1/user/register/submit \
  -H "Content-Type: application/json" \
  -d '{"no_ktp":"123"}'

# 2. Login dengan kredensial salah
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"no_ktp":"wrong","password":"wrong"}'

# 3. Check session tanpa token
curl -X POST http://localhost:3000/api/v1/user/login/session
```

---

## 🔍 Debugging Tests

### Run Specific Test File
```bash
npm test user.test.js
```

### Run Specific Test Suite
```bash
npm test -- --testNamePattern="User API"
```

### Run with Verbose Output
```bash
npm run test:verbose
```

### Run with Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 📊 Memahami Test Results

### ✅ Passed Test
```
✓ should return list of all users (123 ms)
```
Artinya: Test berhasil, endpoint berfungsi dengan baik.

### ❌ Failed Test
```
✕ should return error for invalid credentials (45 ms)
```
Artinya: Test gagal, ada yang tidak sesuai ekspektasi.

### Coverage Report
```
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
user.js            |   72.22 |    33.33 |      70 |   72.22 |
```

- **% Stmts**: Persentase statement yang dijalankan
- **% Branch**: Persentase kondisi if/else yang ditest
- **% Funcs**: Persentase fungsi yang dipanggil
- **% Lines**: Persentase baris kode yang dijalankan

---

## 🛠️ Troubleshooting

### Problem: Test gagal dengan error "Cannot connect to database"
**Solution:**
```bash
# Option 1: Setup test database
mysql -u root -p
CREATE DATABASE test_database;

# Option 2: Update .env.test dengan database credentials yang benar
```

### Problem: Port 3000 already in use
**Solution:**
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau ubah port di app.js
```

### Problem: Test timeout
**Solution:**
Edit `jest.config.js`:
```javascript
testTimeout: 30000  // Increase to 30 seconds
```

### Problem: Module not found
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Meningkatkan Coverage

### 1. Tambah Test Cases
```javascript
test('should handle edge case', async () => {
  // Test edge case here
});
```

### 2. Test Error Scenarios
```javascript
test('should return error when...', async () => {
  // Test error handling
});
```

### 3. Test All Branches
```javascript
// Test both if and else branches
test('when condition is true', async () => { });
test('when condition is false', async () => { });
```

---

## 🎓 Best Practices

### ✅ DO
- Run tests sebelum commit
- Write descriptive test names
- Test both success and error cases
- Keep tests independent
- Use meaningful assertions

### ❌ DON'T
- Don't test implementation details
- Don't make tests dependent on each other
- Don't use real database for unit tests
- Don't skip error cases
- Don't commit failing tests

---

## 📚 Resources

### Documentation
- [TESTING.md](./TESTING.md) - Complete guide
- [tests/README.md](./tests/README.md) - Examples
- [TEST_SUMMARY.md](./TEST_SUMMARY.md) - Current status

### External Links
- [Jest Documentation](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)

---

## 🎉 Checklist

Sebelum push code, pastikan:

- [ ] `npm test` berjalan tanpa error
- [ ] Coverage > 50%
- [ ] Semua endpoint penting sudah ditest
- [ ] Documentation up to date
- [ ] No console.log in production code
- [ ] Error handling tested

---

## 💬 FAQ

**Q: Apakah harus setup database untuk testing?**
A: Tidak wajib. Bisa menggunakan mock database untuk unit tests.

**Q: Berapa coverage yang ideal?**
A: Minimal 70% untuk production code.

**Q: Bagaimana cara test file upload?**
A: Gunakan supertest dengan `.attach()` method atau mock multer.

**Q: Apakah bisa test tanpa start server?**
A: Ya! Test menggunakan in-memory app instance, tidak perlu start server.

**Q: Bagaimana cara test authentication?**
A: Buat test fixtures dengan valid token atau mock authentication middleware.

---

**Happy Testing! 🚀**

Jika ada pertanyaan, silakan buka issue atau hubungi tim development.
