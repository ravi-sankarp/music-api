import * as dotenv from 'dotenv';
import { z } from 'zod';
import { logger } from '../../utils';

// setting the path of the env file
dotenv.config();

const configSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.string().transform((val) => Number(val)),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_PORT: z.string().transform((val) => Number(val)),
  POSTGRES_PASSWORD: z.string(),
  SUPERTOKEN_API_KEY: z.string(),
  SUPERTOKEN_URI: z.string().url()
});

// Validate the config object
const parsedConfig = configSchema.safeParse(process.env);
if (!parsedConfig.success) {
  logger.error('Invalid env configuration:', { error: parsedConfig.error.errors });
  console.error('Invalid env configuration:', parsedConfig.error.errors);
  process.exit(1);
}
/**
 * Config Object which exports everything inside the env file for better accessibility
 */
export const config = parsedConfig.data;
