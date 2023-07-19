'use strict';
const date = new Date();

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
    const rolesData = [
      {
        id: 1,
        nama_role: 'USER',
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 2,
        nama_role: 'ADMIN',
        createdAt: datetime,
        updatedAt: datetime,
      },
    ];
    await queryInterface.bulkInsert('Roles', rolesData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
