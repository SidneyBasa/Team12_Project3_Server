const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Organization extends Model {}

Organization.init({
   name: {
       type: DataTypes.STRING,
       unique:true,
       allowNull:false
    }
}, {
    sequelize,
    modelName: 'organization'
})

module.exports=Organization