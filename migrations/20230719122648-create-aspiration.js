/* eslint-disable new-cap */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aspirations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
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
        type: Sequelize.ENUM('Submitted', 'Processed', 'Done'),
        defaultValue: 'Submitted',
      },
      komentar: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.UUID,
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
    await queryInterface.removeConstraint('Users', 'fk_role_id');
  },
};
