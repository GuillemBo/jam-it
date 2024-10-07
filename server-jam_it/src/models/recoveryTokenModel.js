import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const RecoveryToken = sequelize.define('RecoveryToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  id_user: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: false
});
User.hasMany(RecoveryToken, { foreignKey: 'id_user' });
RecoveryToken.belongsTo(User, { foreignKey: 'id_user' });

export default RecoveryToken;


