const { Incident } = require('../models');

const incidentData = [
  {
    description: 'vending machine theft',
    locationX: 122.321245,
    locationY: 47.608780,
    notes: "The vending machine plexiglass was broken into, all snacks missing.",
    personofInterest:"A male or female height of 5'2' wearing dark sunglasses and hoodie",
    userId: 1
  },
  {
    description: 'staff assault from visitor',
    locationX: 122.321245,
    locationY: 47.608780,
    notes: "A clinical staff member was injured by a visitor.",
    personofInterest:"A female with a height of 5'0' wearing a bike helment",
    userId: 2
  },
  {
    description: 'car break in',
    locationX: 122.321245,
    locationY: 47.608780,
    notes: "An ambulance was broken into",
    personofInterest:"A male with a height of 5'10' wearing a hoodie and ski mask",
    userId: 2
    
  },
]

const seedIncidents = () => Incident.bulkCreate(incidentData);

module.exports = seedIncidents;
