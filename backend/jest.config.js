module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).ts'], // Match test files with .test.ts extension
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/src'], // Ensure this points to the directory containing your source and test files
};