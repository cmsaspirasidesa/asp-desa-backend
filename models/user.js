/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
      });
      this.hasMany(models.Aspiration, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      alamat: DataTypes.STRING,
      nik: DataTypes.STRING,
      refresh_token: DataTypes.TEXT,
      access_token: DataTypes.TEXT,
      expire: DataTypes.DATE,
      status: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'mute'),
        defaultValue: 'active',
      },
      role_id: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
