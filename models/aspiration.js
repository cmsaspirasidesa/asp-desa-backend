'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aspiration extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Image, {
        foreignKey: 'aspirasi_id',
      });
    }
  }
  Aspiration.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      judul: DataTypes.STRING,
      kategori: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      status: {
        allowNull: false,
        type: DataTypes.ENUM('Disampaikan', 'Diproses', 'Selesai'),
        defaultValue: 'Disampaikan',
      },
      ditujukan: DataTypes.STRING,
      komentar: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Aspiration',
    },
  );
  return Aspiration;
};
