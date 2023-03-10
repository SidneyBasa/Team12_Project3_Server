const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Incident extends Model {}

Incident.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationX: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    locationY: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      unique: true,
    },
    personofinterest: {
      type: DataTypes.STRING
    }
    // ,
    // UserId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   }
    // }
  },
  {
    sequelize,
    modelName: 'incident',
  }
);

module.exports = Incident;
