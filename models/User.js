const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

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
        beforeCreate:userObject=>{
            userObject.password = bcrypt.hashSync(userObject.password, 5);
            return userObject
        }
    }
})

module.exports=User