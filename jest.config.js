/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  'moduleNameMapper': {
    '@common/models': '<rootDir>/common/models',
  }
};
