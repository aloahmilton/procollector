# ProCollector Backend API

## Setup Instructions

### Prerequisites
- Node.js 20+ installed
- MySQL 8.0+ installed and running
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create MySQL database:**
   ```sql
   CREATE DATABASE procollector CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the following:
   - `DB_PASSWORD`: Your MySQL root password
   - `JWT_SECRET`: Generate a strong secret key
   - `JWT_REFRESH_SECRET`: Generate another strong secret key

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### API Endpoints

#### Authentication
- `POST /api/v1/auth/login` - Login with email and password
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout (client-side token removal)

#### Collections
- `GET /api/v1/collections` - Get all collections (filtered by role)
- `POST /api/v1/collections` - Create a new collection
- `PATCH /api/v1/collections/:id/verify` - Verify a collection
- `PATCH /api/v1/collections/:id/reject` - Reject a collection

### Testing the API

#### 1. Health Check
```bash
curl http://localhost:5000/health
```

#### 2. Create Test Organization and User
You'll need to manually insert test data into MySQL:

```sql
-- Insert test organization
INSERT INTO organizations (id, name, subdomain, status, subscription_tier, created_at, updated_at)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Demo Organization', 'demo', 'active', 'professional', NOW(), NOW());

-- Insert test user (password: 'password123')
INSERT INTO users (id, organization_id, email, password_hash, name, phone, role, status, two_factor_enabled, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'collector@demo.com',
  '$2a$10$YourHashedPasswordHere',
  'Demo Collector',
  '+237670000000',
  'collector',
  'active',
  false,
  NOW(),
  NOW()
);
```

#### 3. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "collector@demo.com",
    "password": "password123",
    "subdomain": "demo"
  }'
```

### Database Schema

The backend automatically creates the following tables:
- `organizations` - Multi-tenant organization data
- `users` - User accounts with role-based access
- `clients` - Payers/customers
- `collections` - Collection transactions with GPS tracking
- `audit_logs` - System audit trail (to be implemented)

### Security Features

✅ JWT-based authentication with refresh tokens  
✅ Password hashing with bcrypt  
✅ Rate limiting on all endpoints  
✅ CORS protection  
✅ Helmet.js security headers  
✅ SQL injection prevention (Sequelize ORM)  
✅ Role-based access control  

### Next Steps

1. Implement remaining routes (users, clients, organizations)
2. Add service modules (Transport, Hostel, Inventory)
3. Implement audit logging
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Deploy to production server
