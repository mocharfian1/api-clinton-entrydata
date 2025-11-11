// Test setup file
// This file runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';

// Increase timeout for database operations
jest.setTimeout(10000);

// Mock logger to prevent log pollution during tests
global.logger = {
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  level: 'debug'
};
