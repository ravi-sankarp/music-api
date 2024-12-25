'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    await queryInterface.sequelize.query(`
      CREATE TABLE users (
          "user_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          "deleted" BOOLEAN DEFAULT FALSE NOT NULL,
          "email" VARCHAR(255) NOT NULL UNIQUE,
          "password" VARCHAR(255) NOT NULL,
          "created_by" UUID,
          "created_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
          "updated_at" TIMESTAMPTZ
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE users;
    `);
  }
};
