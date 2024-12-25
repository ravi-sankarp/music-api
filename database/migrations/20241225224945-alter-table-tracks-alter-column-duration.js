module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE tracks
      ALTER COLUMN duration TYPE float8;
    `);
  },

  down: async (queryInterface) => {}
};
