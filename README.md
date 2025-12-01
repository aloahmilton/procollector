# ProCollector

**Enterprise Collection & Client Management System**

A cloud-powered suite designed for banks, financial institutions, microfinance companies, and enterprise collectors to transparently manage daily client deposits, field collections, and multi-branch reporting.

## 🎯 Overview

ProCollector is a comprehensive multi-tenant platform consisting of:

- **Web Portal** (Next.js) - Unified interface for all user roles
- **Mobile Apps** (React Native/Expo) - Collector and Client applications
- **Backend API** (NestJS) - RESTful APIs with authentication and business logic
- **Database** (Supabase PostgreSQL) - Secure data storage with Row-Level Security

## 🏗️ Architecture

```
procollector/
├── backend/          # NestJS API server
├── web/              # Next.js web application
├── app/              # React Native/Expo mobile app
├── shared/           # Shared types and utilities
├── docs/             # Documentation
└── env/              # Environment configuration
```

## 🎨 Design System

### Brand Colors
- **Primary (Dark Green)**: `#2E8B57` - Headers, sidebar, key UI elements
- **Secondary (Dust Gold)**: `#F4C430` - Backgrounds, accents, cards
- **Background**: White for content areas
- **Text**: Black for typography

### Features
- Clean, modern interface
- Responsive design
- Dark mode support
- Consistent component library

## 👥 User Roles

1. **Super Admin** - Platform owner, manages all organizations
2. **Bank Manager** - Organization admin, full access to their org
3. **Sub-Admin** - Limited administrative access
4. **Collector** - Field workers recording deposits
5. **Client** - End users viewing their deposits

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL or Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd procollector
   ```

2. **Setup Environment Variables**
   ```bash
   cp env/.env.example backend/.env
   # Edit backend/.env with your credentials
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

4. **Install Web Dependencies**
   ```bash
   cd web
   npm install
   npm run dev
   ```

5. **Install Mobile App Dependencies**
   ```bash
   cd app
   npm install
   npm start
   ```

## 📚 Documentation

- [System Architecture](docs/architecture.md)
- [Entity Relationship Diagram](docs/erd.md)
- [API Specifications](docs/api-specs.md)
- [Development Plan](docs/ai-agent-dev-plan.md)
- [Project Status](docs/PROJECT_STATUS.md)

## 🔑 Key Features

### Multi-Tenancy
- Organization-based data isolation
- Automatic subdomain generation
- Custom branding per organization

### Security
- JWT authentication
- Password hashing with bcrypt
- Row-Level Security (RLS)
- CORS and Helmet.js protection

### Payment Integration
- Modular payment gateway system
- Support for Flutterwave, Campay, CoinPayments
- Webhook handling

### Offline Sync
- Mobile app works offline
- Automatic synchronization when online
- Conflict resolution

### Reporting
- Daily, weekly, monthly reports
- Export to PDF/Excel
- Real-time analytics

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL (Supabase)
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

### Web Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

### Mobile
- **Framework**: React Native
- **Platform**: Expo
- **Language**: TypeScript
- **Storage**: AsyncStorage/SQLite

## 📡 API Endpoints

Base URL: `http://localhost:3001/api/v1`

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register organization
- `POST /auth/refresh-token` - Refresh access token

### Organizations
- `GET /organizations` - List all organizations (Super Admin)
- `GET /organizations/me` - Get current organization
- `PATCH /organizations/me/branding` - Update branding

### Users
- `GET /users` - List users
- `POST /users` - Create user
- `GET /users/:id` - Get user details

### Clients
- `GET /clients` - List clients
- `POST /clients` - Create client
- `GET /clients/:id` - Get client details

### Deposits
- `POST /deposits` - Record deposit
- `GET /deposits` - List deposits
- `GET /deposits/stats` - Get statistics

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚢 Deployment

### Docker
```bash
docker-compose up -d
```

### Manual Deployment
1. Build the backend: `cd backend && npm run build`
2. Build the web app: `cd web && npm run build`
3. Deploy to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support, email support@procollector.net or open an issue in the repository.

---

**Built with ❤️ for enterprise collection management**
