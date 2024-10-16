import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('musician', 'venue'),
    allowNull: false,
    // get() {
    //   const rawValue = this.getDataValue('role');
    //   if (!rawValue) {
    //     console.log('Valor de role es undefined o null');
    //     return [];
    //   }
    //   return rawValue.split(',');
    // },
    // set(value) {
    //   this.setDataValue('role', value.join(','));
    // }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  // photo: {
  //   type: DataTypes.STRING(30),
  //   allowNull: true,
  // },
},{
  indexes: [{ unique: true, fields: ['email'] }],
  
  tableName: 'users',
  timestamps: false,

  
});

export default User;