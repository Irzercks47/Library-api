'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('statuses', [
      {
        status_name: 'borrow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_name: 'return',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
