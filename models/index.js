const User = require('./User');
const Organization = require('./Incident.js');
const Incident = require('./Incident');

Organization.hasMany(User);

User.belongsTo(Organization, {
    foreignKey: 'organizationalId',
    onDelete: 'CASCADE',
})

User.hasMany(Incident, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
})

Incident.belongsTo(User, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
})

module.exports = { User, Organization, Incident };