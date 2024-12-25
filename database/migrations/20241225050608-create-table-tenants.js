'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "tenants" (
          "tenant_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          "deleted" BOOLEAN DEFAULT FALSE NOT NULL,
          "created_on" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          "created_by" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "updated_by" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "updated_on" TIMESTAMPTZ
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE "tenants";
    `);
  }
};
