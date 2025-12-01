export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    BANK_MANAGER = 'bank_manager',
    SUB_ADMIN = 'sub_admin',
    COLLECTOR = 'collector',
    CLIENT = 'client',
}

export enum OrganizationStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
}

export enum DepositStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    FAILED = 'failed',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

export interface User {
    id: string;
    organizationId: string;
    email: string;
    username: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Organization {
    id: string;
    name: string;
    subdomain: string;
    status: OrganizationStatus;
    brandingConfig?: BrandingConfig;
    createdAt: Date;
    updatedAt: Date;
}

export interface BrandingConfig {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
    favicon?: string;
}

export interface Client {
    id: string;
    organizationId: string;
    branchId?: string;
    name: string;
    phone: string;
    email?: string;
    accountNumber: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Deposit {
    id: string;
    organizationId: string;
    clientId: string;
    collectorId: string;
    amount: number;
    transactionDate: Date;
    status: DepositStatus;
    referenceId: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Branch {
    id: string;
    organizationId: string;
    name: string;
    location: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
