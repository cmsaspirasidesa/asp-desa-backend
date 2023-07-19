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
      judul: DataTypes.STRING,
      descripsi: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      status: DataTypes.STRING,
      komentar: DataTypes.STRING,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Aspiration',
    },
  );
  return Aspiration;
};
