'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('librarylogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "books",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      note: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      is_deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.addIndex("librarylogs", ["book_id"]);
    await queryInterface.addIndex("librarylogs", ["user_id"]);
    await queryInterface.addIndex("librarylogs", ["status_id"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('librarylogs');
  }
};