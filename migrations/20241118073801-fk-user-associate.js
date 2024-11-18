'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      type: "foreign key",
      fields: ["roleId"],
      name: "fk_users_roleId",
      references: {
        table: "role", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users","fk_users_roleId");
  }
};