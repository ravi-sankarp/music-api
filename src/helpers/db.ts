import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  process.env.POSTGRES_DATABASE!,
  process.env.POSTGRES_USER!,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
