'use strict';
const { fakerID_ID } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const allUser = []

const users = [...Array(50)].map((user, index) => (
  {
    // id: index + 3,
    nama: fakerID_ID.person.fullName(),
    email: fakerID_ID.internet.email(),
    password: bcrypt.hashSync('123', 8),
    alamat: fakerID_ID.location.streetAddress(),
    nik: '3207892211' + (index + 1),
    role_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
));

const testUser = [
  {
    // id: 1,
    nama: fakerID_ID.person.fullName(),
    email: 'admin1@gmail.com',
    password: bcrypt.hashSync('123', 8),
    alamat: fakerID_ID.location.streetAddress(),
    nik: '43207892211',
    role_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nama: fakerID_ID.person.fullName(),
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('123', 8),
    alamat: fakerID_ID.location.streetAddress(),
    nik: '43207892211',
    role_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

allUser.push(...testUser, ...users)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', allUser);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
