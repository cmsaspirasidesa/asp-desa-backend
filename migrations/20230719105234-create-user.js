'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nik: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      access_token: {
        type: Sequelize.TEXT,
      },
      expire: {
        type: Sequelize.INTEGER,
      },
      role_id: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('Users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_id',
      references: {
        table: 'Roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'fk_role_id');
    await queryInterface.dropTable('Users');
  },
};
