const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const { uuid: uuidv4 } = require('uuid');

class Organization extends Model {}

Organization.init({
   name: {
       type: DataTypes.STRING,
       unique:true,
       allowNull:false
    },
    adminCode: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    authCode: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    normalCode: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    }
}, {
    sequelize,
    modelName: 'organization',
    hooks:{
        beforeCreate: async (orgObject) => {
            orgObject.adminCode = uuid();
            orgObject.authCode = uuid();
            orgObject.normalCode = uuid();
            return orgObject;
        }
    }
})

module.exports=Organization