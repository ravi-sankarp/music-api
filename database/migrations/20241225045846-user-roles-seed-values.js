'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      INSERT INTO user_roles ("name", "description") VALUES
      ('ADMIN', 'Administrator role with full access'),
      ('EDITOR', 'Editor role with access to edit content'),
      ('VIEWER', 'Viewer role with read-only access');
    `);
  },

  down: async (queryInterface) => {}
};
