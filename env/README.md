# Environment Variables

This directory contains environment configuration files for the ProCollector system.

## Setup Instructions

1. Copy `.env.example` to `.env` in the backend directory:
   ```bash
   cp env/.env.example backend/.env
   ```

2. Update the values in `.env` with your actual credentials.

## Required Variables

### Database
- **DATABASE_HOST**: PostgreSQL host
- **DATABASE_PORT**: PostgreSQL port (default: 5432)
- **DATABASE_USER**: Database username
- **DATABASE_PASSWORD**: Database password
- **DATABASE_NAME**: Database name

### Supabase (Alternative to self-hosted PostgreSQL)
- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Supabase anonymous key
- **SUPABASE_SERVICE_ROLE_KEY**: Supabase service role key

### JWT
- **JWT_SECRET**: Secret key for JWT signing (use a strong random string)
- **JWT_EXPIRES_IN**: Token expiration time (e.g., 7d, 24h)

### Payment Gateways
Configure the payment gateways you plan to use. Each gateway requires its own set of credentials.

## Security Notes

⚠️ **NEVER commit `.env` files to version control!**

- Keep your `.env` file secure
- Use different credentials for development, staging, and production
- Rotate secrets regularly
- Use strong passwords and API keys
