# API Specifications

## Base URL
`https://api.procollector.net/v1`

## Authentication
- **Method**: Bearer Token (JWT)
- **Headers**: `Authorization: Bearer <token>`

## Endpoints

### Auth
- `POST /auth/login`: Login user.
- `POST /auth/register`: Register new organization (Super Admin only).
- `POST /auth/refresh-token`: Refresh access token.

### Users
- `GET /users`: List users (filtered by Org).
- `POST /users`: Create new user (Manager/Collector).
- `GET /users/:id`: Get user details.
- `PATCH /users/:id`: Update user.

### Clients
- `GET /clients`: List clients.
- `POST /clients`: Create new client.
- `GET /clients/:id`: Get client details.

### Deposits
- `POST /deposits`: Record a new deposit.
- `GET /deposits`: List deposits (filters: date, collector, client).
- `GET /deposits/stats`: Get aggregation stats.

### Organizations
- `GET /organizations/me`: Get current org details.
- `PATCH /organizations/me/branding`: Update branding.

### Payments
- `POST /payments/initiate`: Start a payment.
- `POST /payments/webhook/:gateway`: Webhook handler.

## Error Handling
Standard HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden (Role/Org mismatch)
- 404: Not Found
- 500: Internal Server Error

Response Format:
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string (optional)
}
```
