const path = require('node:path');

const dotenv = require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const config = {
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  port: process.env.POSTGRES_PORT,
  logging: true
};

if (process.env.NODE_ENV === 'production') {
  config.dialectOptions = {
    ssl: {
      require: true
    }
  };
}
module.exports = config;
