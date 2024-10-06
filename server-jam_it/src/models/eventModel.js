import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Application from './applicationModel.js';
import Venue from './venueModel.js';

const Event = sequelize.define('Event', {
    id_event: {
        type: DataTypes.INTEGER(8),
        primaryKey: true,
        autoIncrement: true
    },
    venue_id: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
        references: {
            model: 'venue',
            key: 'id_venue'
            },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
    },
    application_id: {
        type: DataTypes.INTEGER(8),
        allowNull: true,
        references: {
            model: 'applications', 
            key: 'id_application'
          },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
        
    },
    f_ini: {
        type: DataTypes.DATE,
        allowNull: false
    },
    f_end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    payment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    event_type: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date_end_bid: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.MEDIUMINT(5),
        allowNull: false
    }
}, {
    tableName: 'events',
    timestamps: false
});

// Relaciones entre Event, Application, y Venue
// Event.belongsTo(Venue, { foreignKey: 'venue_id' });
// Event.belongsTo(Application, { foreignKey: 'application_id' });


export default Event;