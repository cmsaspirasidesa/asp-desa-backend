'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'role_id',
      });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    },
  );
  return Role;
};
