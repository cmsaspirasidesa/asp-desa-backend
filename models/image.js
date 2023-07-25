'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      this.belongsTo(models.Aspiration, {
        foreignKey: 'aspirasi_id',
      });
    }
  }
  Image.init(
    {
      url: DataTypes.TEXT,
      aspirasi_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Image',
    },
  );
  return Image;
};
