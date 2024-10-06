// src/models/associations.js
import Event from './eventModel.js';
import Application from './applicationModel.js';
import Group from './groupModel.js';
import Venue from './venueModel.js';
import User from './userModel.js';

// Relaciones
Event.belongsTo(Venue, { foreignKey: 'venue_id' });
Event.belongsTo(Application, { foreignKey: 'application_id' });

Application.belongsTo(Event, { foreignKey: 'event_id' });
Application.belongsTo(Group, { foreignKey: 'group_id' });

Group.belongsTo(User, { foreignKey: 'user_id' }); // Asegúrate de importar User si es necesario
