const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/connection.js');
const { v4: uuid } = require('uuid');

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
        allowNull:false,
        defaultValue:""
    },
    authCode: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
        defaultValue:""
    },
    normalCode: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
        defaultValue:""
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