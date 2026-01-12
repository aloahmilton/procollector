# Network Setup Guide

## Fixing Client Network Errors

If you're experiencing network errors when the client tries to load data, follow these steps:

### 1. Start the Backend Server

The backend must be running for API calls to work:

```bash
cd procollector/backend
npm install  # If not already done
npm run dev  # Starts server on port 5000
```

### 2. Start the Frontend

In a separate terminal:

```bash
cd procollector
npm install  # If not already done
npm run dev  # Starts Vite dev server on port 5173
```

### 3. Verify Backend is Running

Check that the backend is accessible:
- Open: http://localhost:5000/api/v1/health (if health endpoint exists)
- Or check: http://localhost:5000

### 4. Environment Variables

Create a `.env` file in `procollector/backend` with:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
```

### 5. Vite Proxy Configuration

The `vite.config.ts` is configured to proxy `/api` requests to `http://localhost:5000`.

If your backend runs on a different port, update:
- `vite.config.ts`: Change the proxy target
- Or set `VITE_API_URL` environment variable

### 6. Production Deployment

For production, set the `VITE_API_URL` environment variable to your production API URL:

```env
VITE_API_URL=https://api.yourdomain.com
```

The API client in `src/lib/api.ts` will use this URL automatically.

### Common Issues

**Error: "Network error: Unable to connect to server"**
- ✅ Backend server is not running → Start it with `npm run dev` in backend folder
- ✅ Backend is on different port → Update vite.config.ts proxy target
- ✅ CORS errors → Check backend CORS configuration allows localhost:5173

**Error: "Failed to load resource: 500 (Internal Server Error)"**
- ✅ Backend has errors → Check backend console logs
- ✅ Database connection issues → Check Supabase configuration
- ✅ Missing environment variables → Verify .env file in backend

**Error: "401 Unauthorized"**
- ✅ Token expired → Log out and log back in
- ✅ Invalid token → Clear localStorage and re-authenticate

### Testing API Connection

You can test the API connection in browser console:

```javascript
fetch('/api/v1/dashboard/overview', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('procollector_auth_token')}`
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```
