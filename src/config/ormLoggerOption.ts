import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export const enableTypeORMLoggingOptionsPerEnvironment = (): LoggerOptions => {
  const env = process.env.NODE_ENV;
  const o = env === 'production' ? ['error'] : env === 'staging' ? ['error', 'warn', 'log'] : 'all';
  return o as LoggerOptions;
};
