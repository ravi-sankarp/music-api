'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE user_roles (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(100) NOT NULL UNIQUE,
          "description" TEXT
                );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE user_roles;
    `);
  }
};
