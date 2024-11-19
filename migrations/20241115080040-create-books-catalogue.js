'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_name: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT,
        underscored: true
      },
      book_cover: {
        type: Sequelize.STRING,
        underscored: true
      },
      date_published: {
        type: Sequelize.DATE,
        underscored: true
      },
      stock: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};