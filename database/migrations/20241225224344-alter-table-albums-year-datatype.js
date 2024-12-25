module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE albums
      ALTER COLUMN year TYPE INTEGER USING EXTRACT(YEAR FROM year)::integer;
    `);
  },

  down: async (queryInterface) => {}
};
