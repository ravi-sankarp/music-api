module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE INDEX idx_artists_tenant_id ON artists(tenant_id);

CREATE INDEX idx_albums_tenant_id ON albums(tenant_id);

CREATE INDEX idx_tracks_tenant_id ON tracks(tenant_id);

CREATE INDEX idx_favorites_tenant_id_user_id ON favorites(tenant_id, user_id);

    `);
  },

  down: async (queryInterface) => {}
};
