const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Organization extends Model {}

User.init({
   name: {
       type: DataTypes.STRING,
       unique:true,
       allowNull:false
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    }

}, {
    sequelize,
    modelName: 'organization'
})

module.exports=Organization