# ProCollector - Quick Start Guide

## 🎯 What You Have Now

Your ProCollector project is fully initialized with:

✅ **Backend (NestJS)** - API server with Auth and Organizations modules  
✅ **Web (Next.js)** - Modern web portal with dashboard  
✅ **Mobile (Expo)** - React Native app ready for development  
✅ **Documentation** - Complete system architecture and specs  
✅ **Shared Types** - TypeScript interfaces for consistency  

## 🚀 Getting Started

### Step 1: Environment Setup

1. Copy the environment template:
   ```bash
   cp env/.env.example backend/.env
   ```

2. Edit `backend/.env` and add your credentials:
   - Database connection (PostgreSQL or Supabase)
   - JWT secret (generate a strong random string)
   - Email SMTP settings
   - Payment gateway keys (optional for now)

### Step 2: Start the Backend

```bash
cd backend
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3001/api/v1
- **Swagger Docs**: http://localhost:3001/api/docs

### Step 3: Start the Web Portal

Open a new terminal:

```bash
cd web
npm run dev
```

The web app will be available at:
- **Web Portal**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

### Step 4: Start the Mobile App (Optional)

Open another terminal:

```bash
cd app
npm start
```

Then:
- Press `w` to open in web browser
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)
- Scan QR code with Expo Go app on your phone

## 📱 Testing the Setup

### Test the Backend API

1. Open http://localhost:3001/api/docs
2. You should see the Swagger API documentation
3. Try the `/auth/login` endpoint (it's a placeholder for now)

### Test the Web Portal

1. Open http://localhost:3000/dashboard
2. You should see:
   - Sidebar with navigation
   - Header with search
   - Dashboard with stats cards
   - Dark green and dust gold color scheme

### Test the Mobile App

1. After running `npm start`, scan the QR code
2. The app should load in Expo Go
3. You'll see the default Expo template (ready for customization)

## 🛠️ Next Development Steps

### 1. Database Setup (Priority)

Choose one:

**Option A: Supabase (Recommended)**
1. Create a Supabase project at https://supabase.com
2. Copy your connection details to `.env`
3. Create tables using the ERD in `docs/erd.md`

**Option B: Local PostgreSQL**
1. Install PostgreSQL locally
2. Create a database named `procollector`
3. Update `.env` with local credentials

### 2. Create Database Entities

Create TypeORM entities for:
- Organizations
- Users
- Clients
- Deposits
- Branches

### 3. Implement Authentication

- Complete the login logic in `auth.service.ts`
- Create a Users module
- Add user registration
- Implement JWT guards

### 4. Build Web Pages

- Login page (`/login`)
- Organizations management
- Users management
- Clients management
- Deposits recording

### 5. Build Mobile Screens

- Login screen
- Collector dashboard
- Client list
- Deposit recording form
- Offline sync logic

## 📚 Useful Commands

### Backend
```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Generate module
nest g module users
nest g controller users
nest g service users
```

### Web
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Lint
npm run lint
```

### Mobile
```bash
# Start Expo
npm start

# Clear cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🎨 Customization

### Change Colors

Edit `web/app/globals.css`:
```css
--primary: 142 76% 36%;  /* Dark Green */
--secondary: 48 96% 53%; /* Dust Gold */
```

### Add New Pages

1. Create file in `web/app/[page-name]/page.tsx`
2. Use the `DashboardLayout` component
3. Add navigation link in `Sidebar.tsx`

### Add New API Endpoints

1. Generate module: `nest g module [name]`
2. Generate controller: `nest g controller [name]`
3. Generate service: `nest g service [name]`
4. Add to `app.module.ts`

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify `.env` file exists and has correct values
- Check port 3001 is not in use

### Web app shows errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (18+)

### Mobile app won't load
- Clear Expo cache: `npm start -- --clear`
- Restart Expo Go app
- Check network connection

## 📖 Documentation

- **Architecture**: `docs/architecture.md`
- **API Specs**: `docs/api-specs.md`
- **ERD**: `docs/erd.md`
- **Development Plan**: `docs/ai-agent-dev-plan.md`
- **Project Status**: `docs/PROJECT_STATUS.md`

## 🎯 Current Status

✅ Project structure created  
✅ All dependencies installed  
✅ Basic modules implemented  
✅ UI components ready  
⏳ Database entities (next step)  
⏳ Full authentication (next step)  
⏳ CRUD operations (next step)  

## 💡 Tips

1. **Start with Backend**: Get the API working first
2. **Use Swagger**: Test endpoints in the browser
3. **Shared Types**: Import from `shared/types` for consistency
4. **Git Commits**: Commit frequently with clear messages
5. **Environment**: Never commit `.env` files

## 🆘 Need Help?

- Check the documentation in `docs/`
- Review the code comments
- Look at the Swagger API docs
- Check NestJS documentation: https://docs.nestjs.com
- Check Next.js documentation: https://nextjs.org/docs

---

**You're all set! Start building your enterprise collection system! 🚀**
