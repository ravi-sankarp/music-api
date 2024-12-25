'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE favorite_types (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(100) NOT NULL UNIQUE,
          "description" TEXT
                );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE favorite_types;
    `);
  }
};
