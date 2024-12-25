import { Sequelize } from 'sequelize';
import { config } from '../common/config';

export const db = new Sequelize(
  config.POSTGRES_DATABASE!,
  config.POSTGRES_USER,
  config.POSTGRES_PASSWORD,
  {
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    dialect: 'postgres',
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    ...(config.NODE_ENV === 'production'
      ? {
          ssl: true,
          dialectOptions: {
            ssl: {
              require: true
            }
          }
        }
      : {})
  }
);
