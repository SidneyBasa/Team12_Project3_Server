const { Organization } = require('../models');

const organizationData = [
  {
    name: 'Westinghouse',
  },
  {
    name: 'Testla',
  },
  {
    name: 'Eastonhouse',
  },
];

const seedOrgnizations = () => Organization.bulkCreate(organizationData);

module.exports = seedOrgnizations;
