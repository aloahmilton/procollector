import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Organization = sequelize.define('Organization', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    subdomain: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: true,
            isAlphanumeric: true
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
    },
    subscriptionTier: {
        type: DataTypes.ENUM('basic', 'professional', 'enterprise'),
        defaultValue: 'basic',
        field: 'subscription_tier'
    },
    settings: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    defaultTransactionFee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        field: 'default_transaction_fee'
    }
}, {
    tableName: 'organizations',
    indexes: [
        { fields: ['subdomain'] },
        { fields: ['status'] }
    ]
});

export default Organization;
