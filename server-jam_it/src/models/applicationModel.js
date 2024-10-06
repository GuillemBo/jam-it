import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Event from './eventModel.js';
import Group from './groupModel.js';

const Application = sequelize.define('Application', {
    id_application: {
        type: DataTypes.INTEGER(8),
        primaryKey: true,
        autoIncrement: true
    },
    event_id: {
        type: DataTypes.INTEGER(8),
        allowNull: true,
        references: {
            model: 'events',
            key: 'id_event'
        }
    },
    group_id: {
        type: DataTypes.INTEGER(8),
        allowNull: true,
        references: {
            model: 'groups',
            key: 'id_group'
        }
    },
    titulodeloquehago: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descriptiondeloquehago: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'applications',
    timestamps: false
});

// Relaciones entre Application, Event, y Group
// Application.belongsTo(Group, { foreignKey: 'group_id' });
// Application.belongsTo(Event, { foreignKey: 'event_id' });

export default Application;