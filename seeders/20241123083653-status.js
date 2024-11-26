'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('statuses', [
      {
        status_name: 'borrow',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status_name: 'return',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
