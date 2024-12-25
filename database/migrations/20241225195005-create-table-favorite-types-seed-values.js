'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      INSERT INTO favorite_types ("name", "description") VALUES
      ('TRACK', 'Favorite track'),
      ('ALBUM', 'Favorite album'),
      ('ARTIST', 'Favorite artist');
    `);
  },

  down: async (queryInterface) => {}
};
