import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Group = sequelize.define('Group', {
    id_group: {
        type: DataTypes.INTEGER(8),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user'
        },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'groups',
    timestamps: false
});

// Relación entre User y Group
// Group.belongsTo(User, { foreignKey: 'user_id' });

export default Group;