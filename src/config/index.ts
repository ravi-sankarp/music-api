import * as dotenv from 'dotenv';

// setting the path of the env file
dotenv.config();

if (!process.env.NODE_ENV) {
  throw new Error('NODE ENV is required as environment variable');
}

if (!process.env.PORT) {
  throw new Error('PORT is required as environment variable');
}

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT)
};

/**
 * Config Object which exports everything inside the env file for better accessibility
 */
export default config;
