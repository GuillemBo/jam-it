import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const GroupMusician = sequelize.define('group_musicians', {
    id_group: {
      type: DataTypes.INTEGER,
      references: {
        model: 'groups',
        key: 'id_group',
      },
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id_user',
      },
      allowNull: false,
    },
  }, {
    tableName: 'group_musicians',
    timestamps: false,
  });
  

  export default GroupMusician