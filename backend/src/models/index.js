import Organization from './Organization.js';
import User from './User.js';
import Client from './Client.js';
import Collection from './Collection.js';
import { Vehicle, Route } from './Transport.js';
import { HostelBlock, Room } from './Hostel.js';
import { InventoryItem, ProcurementRequest } from './Inventory.js';

// Define associations
Organization.hasMany(User, {
    foreignKey: 'organization_id',
    as: 'users'
});

User.belongsTo(Organization, {
    foreignKey: 'organization_id',
    as: 'organization'
});

Organization.hasMany(Client, {
    foreignKey: 'organization_id',
    as: 'clients'
});

Client.belongsTo(Organization, {
    foreignKey: 'organization_id',
    as: 'organization'
});

User.hasMany(Client, {
    foreignKey: 'assigned_collector_id',
    as: 'assignedClients'
});

Client.belongsTo(User, {
    foreignKey: 'assigned_collector_id',
    as: 'assignedCollector'
});

Organization.hasMany(Collection, {
    foreignKey: 'organization_id',
    as: 'collections'
});

Collection.belongsTo(Organization, {
    foreignKey: 'organization_id',
    as: 'organization'
});

User.hasMany(Collection, {
    foreignKey: 'collector_id',
    as: 'collections'
});

Collection.belongsTo(User, {
    foreignKey: 'collector_id',
    as: 'collector'
});

Client.hasMany(Collection, {
    foreignKey: 'client_id',
    as: 'collections'
});

Collection.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

// Transport Associations
Organization.hasMany(Vehicle, { foreignKey: 'organizationId', as: 'vehicles' });
Vehicle.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Route, { foreignKey: 'organizationId', as: 'routes' });
Route.belongsTo(Organization, { foreignKey: 'organizationId' });

// Hostel Associations
Organization.hasMany(HostelBlock, { foreignKey: 'organizationId', as: 'hostelBlocks' });
HostelBlock.belongsTo(Organization, { foreignKey: 'organizationId' });

HostelBlock.hasMany(Room, { foreignKey: 'hostelBlockId', as: 'rooms' });
Room.belongsTo(HostelBlock, { foreignKey: 'hostelBlockId' });

// Inventory Associations
Organization.hasMany(InventoryItem, { foreignKey: 'organizationId', as: 'inventory' });
InventoryItem.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(ProcurementRequest, { foreignKey: 'organizationId', as: 'procurementRequests' });
ProcurementRequest.belongsTo(Organization, { foreignKey: 'organizationId' });

export {
    Organization,
    User,
    Client,
    Collection,
    Vehicle,
    Route,
    HostelBlock,
    Room,
    InventoryItem,
    ProcurementRequest
};
