// src/models/associations.js
import Event from './eventModel.js';
import Application from './applicationModel.js';
import Group from './groupModel.js';
import Venue from './venueModel.js';
import User from './userModel.js';

// Relaciones
Event.belongsTo(Venue, { foreignKey: 'id_venue' });
Event.belongsTo(Application, { foreignKey: 'id_application' });

Application.belongsTo(Event, { foreignKey: 'id_event' });
Application.belongsTo(Group, { foreignKey: 'id_group' });

Group.belongsTo(User, { foreignKey: 'id_user' }); // Asegúrate de importar User si es necesario
