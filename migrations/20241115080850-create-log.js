'use strict';

const bookscatalogue = require('../models/bookscatalogue');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        underscored: true,
        references: {
          model: bookscatalogue,
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.INTEGER
      },
      returnDate: {
        type: Sequelize.DATE,
        underscored: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs');
  }
};

bookscatalogue.hasMany(logs);