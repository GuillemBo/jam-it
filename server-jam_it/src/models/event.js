import { DataTypes } from "sequelize";
import sequelize from '../db.js';
import Venue from './venueModel.js'; // Relación con la tabla `venue`
import Application from './applicationModel.js'; // Relación con la tabla `applications`

const Event = sequelize.define('Event', {
    id_event: {
        type: DataTypes.INTEGER(8),
        primaryKey: true,
        autoIncrement: true,
      },
      venue_id: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
        references: {
          model: Venue,  // Relación con `Venue`
          key: 'id_venue',
        },
        onDelete: 'CASCADE', // Eliminar el evento si se elimina el venue
      },
      application_id: {
        type: DataTypes.INTEGER(8),
        allowNull: true,
        references: {
          model: Application, // Relación con `Application`
          key: 'id_application',
        },
        onDelete: 'SET NULL', // Si se elimina la solicitud, se pone a NULL
      },
      f_ini: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      f_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      payment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      event_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      date_end_bid: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      }
    }, {
      tableName: 'events',
      timestamps: false, // Porque no tienes createdAt y updatedAt en tu tabla
    });
    
    // Relación con `Venue`
    Event.belongsTo(Venue, {
      foreignKey: 'venue_id',
      as: 'venue', // Alias para acceder al venue
    });
    
    // Relación con `Application`
    Event.belongsTo(Application, {
      foreignKey: 'application_id',
      as: 'application', // Alias para acceder a la application
    });
    
    export default Event;