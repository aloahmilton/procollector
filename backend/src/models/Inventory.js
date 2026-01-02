import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const InventoryItem = sequelize.define('InventoryItem', {
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
    category: {
        type: DataTypes.STRING, // e.g., 'Stationery', 'Electronics', 'Furniture'
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    unit: {
        type: DataTypes.STRING, // e.g., 'pcs', 'kg', 'boxes'
        defaultValue: 'pcs'
    },
    minThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    location: {
        type: DataTypes.STRING
    },
    lastRestocked: {
        type: DataTypes.DATE
    }
});

const ProcurementRequest = sequelize.define('ProcurementRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    itemId: {
        type: DataTypes.UUID,
        allowNull: true // Could be null if it's a new item request
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED'),
        defaultValue: 'PENDING'
    },
    requestedBy: {
        type: DataTypes.STRING
    }
});

export { InventoryItem, ProcurementRequest };
