# Shared Types and Utilities

This directory contains shared TypeScript types, interfaces, and utility functions used across the ProCollector platform (backend, web, and mobile).

## Structure

```
shared/
├── types/          # TypeScript interfaces and types
├── validators/     # Validation schemas (future)
└── utils/          # Shared utility functions (future)
```

## Usage

### In Backend (NestJS)
```typescript
import { UserRole, ApiResponse } from '../../shared/types';
```

### In Web (Next.js)
```typescript
import { UserRole, ApiResponse } from '@/shared/types';
```

### In Mobile (React Native)
```typescript
import { UserRole, ApiResponse } from '../shared/types';
```

## Types Available

- **UserRole**: Enum for user roles
- **OrganizationStatus**: Enum for organization statuses
- **DepositStatus**: Enum for deposit statuses
- **PaymentStatus**: Enum for payment statuses
- **User**: User interface
- **Organization**: Organization interface
- **Client**: Client interface
- **Deposit**: Deposit interface
- **Branch**: Branch interface
- **ApiResponse**: Standard API response format
