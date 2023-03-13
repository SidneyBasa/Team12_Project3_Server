const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require("bcrypt")

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
        type: DataTypes.STRING,
        allowNull: false
    },
    isAuth: {
        type: DataTypes.BOOLEAN
    },
    isAdmin: {
        type: DataTypes.BOOLEAN
    },
    organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

    // ,
    // organizationId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'organization',
    //         key: 'id',
    //     }
    // }
}, {
    sequelize,
    modelName: 'user',
    hooks: {
        // Before the password is submitted encrypt with bcrypt method hash 
        beforeCreate: async (userObject) => {
            userObject.password = await bcrypt.hash(userObject.password, 5);
            return userObject;
        },
        // Makes sure the password is encrypted before updating the database
        beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 5);
        return updatedUserData;
        },

    }
})

module.exports=User