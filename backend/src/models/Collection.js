import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Collection = sequelize.define('Collection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'organization_id',
        references: {
            model: 'organizations',
            key: 'id'
        }
    },
    collectorId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'collector_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'client_id',
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('cash', 'mobile_money', 'bank_transfer', 'card'),
        allowNull: false,
        field: 'payment_method'
    },
    status: {
        type: DataTypes.ENUM('pending', 'verified', 'rejected', 'reversed'),
        defaultValue: 'pending'
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
    receiptNumber: {
        type: DataTypes.STRING(50),
        unique: true,
        field: 'receipt_number'
    },
    collectedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'collected_at'
    },
    verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'verified_at'
    },
    metadata: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'collections',
    indexes: [
        { fields: ['organization_id', 'collector_id'] },
        { fields: ['status'] },
        { fields: ['collected_at'] },
        { fields: ['receipt_number'], unique: true }
    ]
});

export default Collection;
