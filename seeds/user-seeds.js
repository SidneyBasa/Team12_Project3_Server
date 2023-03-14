const { User } = require('../models');

const userData = [
  {
    name: 'user1',
    displayName: 'Captain',
    password: 'password',
    isAuth: 'true',
    isAdmin: 'true',
    organizationId: 1
  },
  {
    name: 'user2',
    displayName: 'Sub Commander',
    password: 'password',
    isAuth: 'true',
    isAdmin: 'false',
    organizationId: 2
  },
  {
    name: 'user3',
    displayName: 'Commander',
    password: 'password',
    isAuth: 'false',
    isAdmin: 'false',
    organizationId: 3
  },
];

const seedUsers = () => User.bulkCreate(userData,{individualHooks:true});

module.exports = seedUsers;
