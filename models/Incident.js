const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Incident extends Model {}

Incident.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'incident'
    },
    locationX: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 122.321245
    },
    locationY: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 47.608780
    },
    notes: {
      type: DataTypes.STRING,
      unique: false,
      defaultValue: 'notable'
    },
    personofinterest: {
      type: DataTypes.STRING,
      defaultValue: 'person'
    }
  },
  {
    sequelize,
    modelName: 'incident',
  }
);

module.exports = Incident;
