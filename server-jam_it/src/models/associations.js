// src/models/associations.js
import Event from './eventModel.js';
import Application from './applicationModel.js';
import Group from './groupModel.js';
import Venue from './venueModel.js';
import User from './userModel.js';
import GroupMusician from './groupMusicianModel.js';

// Relaciones

export default function setupAssociations() {


Venue.hasMany(Event, { foreignKey: 'id_venue' });
Venue.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Venue, { foreignKey: 'id_user' });

Application.belongsTo(Event, { foreignKey: 'id_event' });
Application.belongsTo(Group, { foreignKey: 'id_group' });

User.belongsToMany(Group, { through: GroupMusician, foreignKey: 'id_user' });

}

