const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const SensorData = sequelize.define('SensorData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  temperature: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  oxygen_saturation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  heart_rate: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = SensorData;
