/* eslint-disable new-cap */
'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aspirations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      kategori: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Umum',
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      lokasi: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('Disampaikan', 'Diproses', 'Selesai'),
        defaultValue: 'Disampaikan',
      },
      ditujukan: {
        type: Sequelize.STRING,
        defaultValue: 'Desa',
        allowNull: false,
      },
      komentar: {
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
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
    await queryInterface.addConstraint('Aspirations', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Aspirations');
    await queryInterface.removeConstraint('Users', 'fk_user_id');
  },
};
