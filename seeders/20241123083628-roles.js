'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        role_name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
