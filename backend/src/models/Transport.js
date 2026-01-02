import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('BUS', 'VAN', 'TRUCK', 'CAR'),
        defaultValue: 'BUS'
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'MAINTENANCE', 'RETIRED'),
        defaultValue: 'ACTIVE'
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['organizationId', 'plateNumber']
        }
    ]
});

const Route = sequelize.define('Route', {
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
    startPoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endPoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stops: {
        type: DataTypes.JSON, // Array of stop names
        defaultValue: []
    }
});

export { Vehicle, Route };
