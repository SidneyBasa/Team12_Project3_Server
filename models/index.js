const User = require('./User');
const Organization = require('./Organization');
const Incident = require('./Incident');


User.belongsTo(Organization, {
    foreignKey: 'organizationId',
    onDelete: 'CASCADE',
}
)

Organization.hasMany(User);

Incident.belongsTo(User, 
    {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
}
)

User.hasMany(Incident)

module.exports = { User, Organization, Incident };

