const jwt = require("jsonwebtoken");
const {User} = require('../models');

async function IsUser(token) {
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        if(data) {
            console.log('returning true');
            return true;
        }
        console.log('returning false');
        return false;
    } catch (err) {
        console.log('returning false');
        return false;
    }
}

async function IsAuth(token) {
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        await User.findByPk(data.id).then(foundUser=>{
            return foundUser.isAuth;
        });
    } catch (err) {
        return false;
    }
}

async function IsAdmin(token, orgId) {
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        return await User.findByPk(data.id).then(foundUser=>{
            return (foundUser.organizationId == orgId) && foundUser.isAdmin;
        });
    } catch (err) {
        return false;
    }
}

module.exports = {
    IsUser,
    IsAuth,
    IsAdmin
};