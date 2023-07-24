'use strict';
const date = new Date();
const bcrypt = require('bcrypt');

const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const hours = ('0' + date.getHours()).slice(-2);
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2);

const datetime =
  year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        id: 1,
        nama: 'Admin 1',
        email: 'admin1@gmail.com',
        password: bcrypt.hashSync('123', 8),
        alamat: ' jl. antah barantah',
        nik: '864225677',
        role_id: 2,
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 2,
        nama: 'Admin 2',
        email: 'admin2@gmail.com',
        password: bcrypt.hashSync('123', 8),
        alamat: ' jl. putus asa',
        nik: '12356778766',
        role_id: 2,
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 3,
        nama: 'User 1',
        email: 'user1@gmail.com',
        password: bcrypt.hashSync('123', 8),
        alamat: ' jl. memohon ampunan',
        nik: '24557689879',
        role_id: 1,

        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 4,
        nama: 'User 2',
        email: 'user2@gmail.com',
        password: bcrypt.hashSync('123', 8),
        alamat: ' jl. yang benar',
        nik: '097532468995986',
        role_id: 1,

        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 5,
        nama: 'User 3',
        email: 'user3@gmail.com',
        password: bcrypt.hashSync('123', 8),
        alamat: ' jl. jalan-jalan',
        nik: '0876542158999',
        role_id: 1,

        createdAt: datetime,
        updatedAt: datetime,
      },
    ];
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
