const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
   name: {
       type: DataTypes.STRING,
       unique:true,
       allowNull:false
    },
    displayName: {
       type: DataTypes.STRING,
       unique:true,
       allowNull:false
    },
    password: {
        type: DatTypes.STRING,
    },
    isAuth: {
        type: DataTypes.BOOLEAN
    },
    isAdmin: {
        type: DataTypes.BOOLEAN
    },
    organizationalId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'organization',
            key: 'id',
        }
    }

}, {
    sequelize,
    modelName: 'user'
})

module.exports=User