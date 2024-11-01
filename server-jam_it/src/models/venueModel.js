import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Event from './eventModel.js'

const Venue = sequelize.define('Venue', {
  id_venue: {
      type: DataTypes.INTEGER(8),
      primaryKey: true,
      autoIncrement: true
  },
  id_user: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id_user'
      }
  },
  title: {
      type: DataTypes.STRING(200),
      allowNull: false
  },
  address: {
      type: DataTypes.STRING(200),
      allowNull: false
  },
  capacity: {
      type: DataTypes.SMALLINT(5),
      allowNull: false
  }
},
{
  indexes: [{ unique: true, fields: ['title'] }],
  timestamps: true, // Activa la creación automática de createdAt y updatedAt
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});


export default Venue;