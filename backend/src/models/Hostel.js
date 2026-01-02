import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HostelBlock = sequelize.define('HostelBlock', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('MALE', 'FEMALE', 'MIXED'),
        defaultValue: 'MIXED'
    },
    caretaker: {
        type: DataTypes.STRING
    }
});

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    hostelBlockId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    occupied: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('AVAILABLE', 'FULL', 'MAINTENANCE'),
        defaultValue: 'AVAILABLE'
    }
});

export { HostelBlock, Room };
