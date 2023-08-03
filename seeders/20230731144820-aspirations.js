'use strict';

const { fakerID_ID, faker } = require('@faker-js/faker');

const arrMasalahJudul = [
  'Masalah Politik di',
  'Masalah Pembangunan di',
  'Perbaikan Jalan di',
  'Program Ekonomi di',
  'Program Pendidikan di',
];

const aspirations = [];

for (let i = 1; i <= 25; i++) {
  const judul = `${faker.helpers.arrayElement(
    arrMasalahJudul,
  )} ${fakerID_ID.location.streetAddress()}`;
  aspirations.push({
    judul: judul,
    deskripsi: `Penanganan ${judul}`,
    ditujukan: fakerID_ID.person.fullName(),
    lokasi: fakerID_ID.location.streetAddress(),
    status: faker.helpers.arrayElement(['Disampaikan', 'Diproses', 'Selesai']),
    komentar: '',
    email: fakerID_ID.internet.email(),
    nama: fakerID_ID.person.fullName(),
    user_id: null,
    createdAt: faker.date.between({
      from: '2023-05-01T00:00:00.000Z',
      to: '2023-07-31T00:00:00.000Z',
    }),
    updatedAt: new Date(),
  });
}

const aspResult = aspirations.map((obj, index) => {
  if ({ ...obj }.status == 'Selesai') {
    return { ...obj, komentar: `${obj.deskripsi} telah selesai diproses` };
  } else {
    return { ...obj };
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Aspirations', aspResult, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
