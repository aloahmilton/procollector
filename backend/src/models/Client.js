import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Client = sequelize.define('Client', {
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
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'full_name'
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        defaultValue: 'active'
    },
    assignedCollectorId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'assigned_collector_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    metadata: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    transactionFee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'transaction_fee',
        comment: 'Override global organization transaction fee if set'
    },
    idCardNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'id_card_number'
    },
    quarter: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'clients',
    indexes: [
        { fields: ['organization_id', 'status'] },
        { fields: ['phone'] }
    ]
});

export default Client;
