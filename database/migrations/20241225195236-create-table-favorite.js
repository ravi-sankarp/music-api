module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "favorites" (
        "favourite_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "tenant_id" UUID NOT NULL REFERENCES "tenants"("tenant_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
        "user_id" UUID NOT NULL REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
        "item_id" UUID NOT NULL,
        "type" INTEGER REFERENCES "favorite_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
        "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        "updated_at" TIMESTAMPTZ,
        CONSTRAINT fk_track FOREIGN KEY (item_id) REFERENCES tracks(track_id) ON DELETE CASCADE ON UPDATE RESTRICT,
        CONSTRAINT fk_album FOREIGN KEY (item_id) REFERENCES albums(album_id) ON DELETE CASCADE ON UPDATE RESTRICT,
        CONSTRAINT fk_artist FOREIGN KEY (item_id) REFERENCES artists(artist_id) ON DELETE CASCADE ON UPDATE RESTRICT,
        CONSTRAINT unique_user_item UNIQUE ("user_id", "item_id", "tenant_id")
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE "favorites";
    `);
  }
};
