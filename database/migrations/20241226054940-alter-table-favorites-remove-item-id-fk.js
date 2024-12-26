module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE favorites
      DROP CONSTRAINT IF EXISTS fk_artist,
      DROP CONSTRAINT IF EXISTS fk_album,
      DROP CONSTRAINT IF EXISTS fk_track;
    `);
  },

  down: async (queryInterface) => {}
};
