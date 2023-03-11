const User = require('./User');
const Organization = require('./Organization');
const Incident = require('./Incident');


User.belongsTo(Organization, {
    foreignKey: {
        allowNull: 'false',
    },
    onDelete: 'CASCADE',
}
)

Organization.hasMany(User);

Incident.belongsTo(User, 
    {
    foreignKey: {
        allowNull: 'false',
    },
    onDelete: 'CASCADE',
}
)

User.hasMany(Incident)

module.exports = { User, Organization, Incident };

