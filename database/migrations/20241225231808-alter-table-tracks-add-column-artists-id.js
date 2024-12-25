module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE tracks
      ADD COLUMN artist_id UUID NOT NULL,
      ADD CONSTRAINT fk_artist
      FOREIGN KEY (artist_id)
      REFERENCES artists(artist_id)
      ON UPDATE RESTRICT
      ON DELETE CASCADE;
    `);
  },

  down: async (queryInterface) => {}
};
