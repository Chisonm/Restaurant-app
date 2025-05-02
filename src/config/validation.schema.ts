import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_NAME: Joi.string().default('food_ordering'),
  JWT_SECRET: Joi.string().default('secure-jwt-secret-key-should-be-in-env'),
  JWT_EXPIRES_IN: Joi.string().default('24h'),
  API_PREFIX: Joi.string().default('api'),  
});