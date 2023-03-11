const seedIncidents = require('./incident-seeds');
const seedOrgnizations = require('./organization-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedIncidents();
  console.log('\n----- INCIDENTS SEEDED -----\n');

  await seedOrgnizations();
  console.log('\n----- ORGNIZATIONS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
