'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'alice_jones',
        email: 'alice.jones@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'bob_williams',
        email: 'bob.williams@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'charlie_brown',
        email: 'charlie.brown@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'david_miller',
        email: 'david.miller@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'ella_johnson',
        email: 'ella.johnson@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'frank_clark',
        email: 'frank.clark@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'grace_davis',
        email: 'grace.davis@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'hannah_evans',
        email: 'hannah.evans@example.com',
        password: bcrypt.hashSync('password123', 10),
        role_id: Math.floor(Math.random() * 2 + 1),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // Insert users into the 'Users' table
    return queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the seed by deleting the inserted users
    return queryInterface.bulkDelete('users', null, {});
  }
};
