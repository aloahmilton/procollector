# Admin Portal Setup & Configuration

## Configurable Admin Slug

The admin route slug is now configurable via environment variable `VITE_ADMIN_SLUG`.

### Default Behavior
- Default admin route: `/admin`
- Can be changed to `/systemadmin` or any custom slug

### Configuration

**Development (.env file in procollector root):**
```env
VITE_ADMIN_SLUG=admin
# or
VITE_ADMIN_SLUG=systemadmin
# or any custom slug
```

**Production (Vercel/Netlify/etc):**
Set `VITE_ADMIN_SLUG` in your deployment platform's environment variables.

### Usage in Code

The admin slug is centralized in `src/lib/config.ts`:

```typescript
import { config } from './lib/config';

// Get admin base path
const adminPath = config.getAdminPath(); // Returns '/admin' or configured slug

// Get admin sub-path
const orgsPath = config.getAdminPath('organizations'); // Returns '/admin/organizations'

// Check if path is admin path
const isAdmin = config.isAdminPath('/admin/organizations'); // Returns true
```

## Admin Pages & Integration Status

### ✅ Fully Integrated

1. **GlobalOverview** (`/admin`)
   - ✅ Uses API client
   - ✅ Fetches from `/api/v1/dashboard/admin`
   - ✅ Error handling with fallback

2. **Organizations** (`/admin/organizations`)
   - ✅ Uses API client
   - ✅ Fetches from `/api/v1/organizations`
   - ✅ CRUD operations ready

3. **Collections** (`/admin/collections`)
   - ✅ Uses API client
   - ✅ Fetches from `/api/v1/collections`
   - ✅ Export PDF/Excel functionality
   - ✅ Real-time data loading

4. **CSVImport** (`/admin/csv-import`)
   - ✅ Uses API client
   - ✅ Validates via `/api/v1/csv-import/validate`
   - ✅ Imports via `/api/v1/csv-import/clients` or `/api/v1/csv-import/collections`

### 🔧 What's Left to Integrate

1. **Error Management** (not currently routed)
   - Needs route added to App.tsx
   - Needs API endpoint: `/api/v1/admin/errors`

2. **User Management** (not currently routed)
   - Needs route added to App.tsx
   - Needs API endpoints: `/api/v1/admin/users` (GET, POST, PUT, DELETE)

3. **Financial Config** (not currently routed)
   - Needs route added to App.tsx
   - Needs API endpoint: `/api/v1/admin/financial-config`

4. **SMTP Config** (not currently routed)
   - Needs route added to App.tsx
   - Needs API endpoint: `/api/v1/admin/smtp-config`

5. **Admin Settings** (not currently routed)
   - Needs route added to App.tsx
   - Needs API endpoint: `/api/v1/admin/settings`

6. **Reports** (referenced in sidebar but not routed)
   - Needs route added to App.tsx
   - Needs API endpoint: `/api/v1/admin/reports`

## API Endpoints Required

### Backend Routes Needed

```javascript
// In backend/src/routes/admin.js or similar

// Error Management
GET    /api/v1/admin/errors
POST   /api/v1/admin/errors/:id/resolve
DELETE /api/v1/admin/errors/:id

// User Management
GET    /api/v1/admin/users
POST   /api/v1/admin/users
PUT    /api/v1/admin/users/:id
DELETE /api/v1/admin/users/:id

// Financial Config
GET    /api/v1/admin/financial-config
PUT    /api/v1/admin/financial-config

// SMTP Config
GET    /api/v1/admin/smtp-config
PUT    /api/v1/admin/smtp-config
POST   /api/v1/admin/smtp-config/test

// Admin Settings
GET    /api/v1/admin/settings
PUT    /api/v1/admin/settings

// Reports
GET    /api/v1/admin/reports
GET    /api/v1/admin/reports/export
```

## Adding Missing Routes

To add missing admin routes, update `src/App.tsx`:

```typescript
<Route path={config.getAdminPath()} element={...}>
  {/* Existing routes */}
  <Route path="errors" element={<ProtectedRoute requiredRole="admin"><ErrorManagement /></ProtectedRoute>} />
  <Route path="users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
  <Route path="financial" element={<ProtectedRoute requiredRole="admin"><FinancialConfig /></ProtectedRoute>} />
  <Route path="smtp" element={<ProtectedRoute requiredRole="admin"><SmtpConfig /></ProtectedRoute>} />
  <Route path="settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
  <Route path="reports" element={<ProtectedRoute requiredRole="admin"><Reports /></ProtectedRoute>} />
</Route>
```

## Testing Admin Access

1. Set `VITE_ADMIN_SLUG=systemadmin` in `.env`
2. Restart dev server: `npm run dev`
3. Admin routes will be at `/systemadmin` instead of `/admin`
4. All sidebar links and redirects will automatically use the new slug

## Security Notes

- Admin routes are protected by `requiredRole="admin"`
- All API calls require authentication token
- Admin slug change doesn't affect security, only routing
- Consider using a non-obvious slug in production (e.g., `/sys-admin-2024`)
