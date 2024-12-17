'use strict';
/** @type {import('sequelize-cli').Migration} */
// bugged cannot assign foreign key
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_logged_in: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex("users", ["role_id"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};