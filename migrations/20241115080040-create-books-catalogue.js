'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booksCatalogues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookName: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT,
        underscored: true
      },
      bookCover: {
        type: Sequelize.STRING,
        underscored: true
      },
      datePublished: {
        type: Sequelize.DATE,
        underscored: true
      },
      stock: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('booksCatalogues');
  }
};