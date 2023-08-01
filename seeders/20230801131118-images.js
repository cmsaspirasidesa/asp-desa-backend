'use strict';

const { faker } = require('@faker-js/faker');

require('dotenv').config();

const url = [
  `http://localhost:${process.env.PORT}/image1.jpg`,
  `http://localhost:${process.env.PORT}/image2.jpeg`,
  `http://localhost:${process.env.PORT}/image3.jpg`,
  `http://localhost:${process.env.PORT}/image4.jpg`,
];

const images1 = [...Array(25)].map((image, index) => ({
  url: faker.helpers.arrayElement(url),
  aspirasi_id: index + 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const images2 = [...Array(25)].map((image, index) => ({
  url: faker.helpers.arrayElement(url),
  aspirasi_id: index + 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const allImages = [...images1, ...images2].sort(
  (a, b) => a.aspirasi_id - b.aspirasi_id,
);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', allImages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
};
