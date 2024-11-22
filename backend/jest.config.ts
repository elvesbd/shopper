import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@test/(.+)': '<rootDir>/src/test/$1',
    '@domain/(.+)': '<rootDir>/src/domain/$1',
    '@application/(.+)': '<rootDir>/src/application/$1',
    '@infrastructure/(.+)': '<rootDir>/src/infrastructure/$1',
  },
};

export default config;
