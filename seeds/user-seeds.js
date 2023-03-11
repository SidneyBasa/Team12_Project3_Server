const { User } = require('../models');

const userData = [
  {
    name: 'Archer',
    displayName: 'Captain',
    password: 'enterprise',
    isAuth: 'true',
    isAdmin: 'true'
  },
  {
    name: 'Tepal',
    displayName: 'Sub Commander',
    password: 'Kershan',
    isAuth: 'true',
    isAdmin: 'true'
  },
  {
    name: 'Tucker',
    displayName: 'Commander',
    password: 'fusioncoils',
    isAuth: 'true',
    isAdmin: 'true'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
