const { User } = require('../models');

const userData = [
  {
    name: 'Archer',
    displayName: 'Captain',
    password: 'enterprise',
    isAuth: 'true',
    isAdmin: 'true',
    organizationId: 1
  },
  {
    name: 'Tepal',
    displayName: 'Sub Commander',
    password: 'Kershan',
    isAuth: 'true',
    isAdmin: 'true',
    organizationId: 2
  },
  {
    name: 'Tucker',
    displayName: 'Commander',
    password: 'fusioncoils',
    isAuth: 'true',
    isAdmin: 'true',
    organizationId: 3
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
