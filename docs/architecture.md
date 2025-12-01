# ProCollector System Architecture

## Overview
ProCollector is a cloud-powered suite designed for banks, financial institutions, microfinance companies, and enterprise collectors. It facilitates transparent management of daily client deposits, field collections, and multi-branch reporting.

## Core Components

### 1. Web Portal (Next.js)
- **Role**: Unified web application for all user roles (Super Admin, Bank Manager, Sub-Admins, Employees/Collectors, Clients).
- **Tech Stack**: Next.js, React, Tailwind CSS.
- **Features**:
  - Role-based dashboard loading.
  - Organization management.
  - Reporting and analytics.
  - Client and deposit management.

### 2. Mobile Apps (React Native / Expo)
- **Role**: Dedicated apps for Collectors and Clients.
- **Tech Stack**: React Native, Expo.
- **Features**:
  - **Collector App**: Create accounts, record deposits, offline mode with sync.
  - **Client App**: View deposits, balances, download statements.

### 3. Backend (Node.js + NestJS)
- **Role**: Centralized API and business logic.
- **Tech Stack**: NestJS, Express, TypeORM.
- **Features**:
  - RESTful APIs.
  - Authentication & Authorization (JWT, Passport).
  - Multi-tenancy support (Organization-based).
  - Payment Gateway Hub.
  - Notification System (SMTP).

### 4. Database (Supabase PostgreSQL)
- **Role**: Primary data store.
- **Features**:
  - Row-Level Security (RLS) keyed by `organization_id`.
  - Tables: Organizations, Users, Roles, Branches, Clients, Deposits, Payments.

## High-Level Data Flow

1.  **User Interaction**: Users interact via Web Portal or Mobile Apps.
2.  **API Gateway**: Requests are sent to the NestJS Backend.
3.  **Auth & Security**: Backend validates JWT and checks Permissions/Roles.
4.  **Business Logic**: Services process the request (e.g., record deposit, create user).
5.  **Data Persistence**: Data is stored/retrieved from Supabase PostgreSQL.
6.  **External Services**: Payment gateways (Flutterwave, Campay) and Email services are called as needed.

## Multi-Tenancy Strategy
- **Identification**: Each organization is assigned a unique `organization_id`.
- **Isolation**: All database queries include `where organization_id = ?` (enforced via RLS or Service layer).
- **Branding**: Frontend loads branding assets based on the resolved organization.

## Payment Module
- **Structure**: Modular strategy pattern.
- **Gateways**: Flutterwave, Campay, Coinpayments.
- **Flow**:
  1.  Initiate Payment -> Select Gateway -> Process -> Webhook/Callback -> Update Status.

## Sync Logic (Mobile)
- **Offline Mode**: Collectors can record data locally (SQLite/Realm/AsyncStorage).
- **Sync Process**:
  - Detect Online connectivity.
  - Push local changes to Backend.
  - Pull latest updates from Backend.
  - Conflict resolution (Server wins or Timestamp based).
