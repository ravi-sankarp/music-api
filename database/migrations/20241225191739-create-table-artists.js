module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "artists" (
          "artist_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          "name" VARCHAR(255) NOT NULL,
          "grammy" INT DEFAULT 0 NOT NULL,
          "hidden" BOOLEAN DEFAULT FALSE NOT NULL,
          "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          "updated_at" TIMESTAMPTZ,
          "tenant_id" UUID NOT NULL REFERENCES "tenants"("tenant_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "created_by" UUID NOT NULL REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
          "updated_by" UUID REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE "artists";
    `);
  }
};