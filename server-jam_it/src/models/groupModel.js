import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Group = sequelize.define('Group', {
    id_group: {
        type: DataTypes.INTEGER(8),
        primaryKey: true,
        autoIncrement: true
    },
    musicians: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    id_user: {
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


export default Group;