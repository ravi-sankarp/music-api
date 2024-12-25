'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "tenant_users" (
        "tenant_id" UUID REFERENCES "tenants"("tenant_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
        "user_id" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "role_id" INT REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "deleted" BOOLEAN DEFAULT FALSE NOT NULL,
          "created_by" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          "updated_by" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "updated_at" TIMESTAMPTZ,
          PRIMARY KEY ("user_id", "tenant_id")
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE "tenant_users";
    `);
  }
};
