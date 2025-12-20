# ProCollector Portal Overview

**Date:** December 20, 2025  
**Status:** Complete Portal Architecture Overview

---

## 📊 Complete Portal Structure

### All 6 Protected Portals (Require Login)

#### 1️⃣ SYSTEM ADMIN PORTAL (`/admin`)
**File Location:** `src/pages/admin/`

**Pages:**
- `GlobalOverview.tsx` - Main dashboard (3 tabs: Overview/Organizations/Billing)
- `Organizations.tsx` - Manage organizations & subscriptions
- `Collections.tsx` - Track all collections across system
- `CSVImport.tsx` - Bulk client/transaction imports

**Access Route:** `/login` → Sign in → `/admin`

---

#### 2️⃣ ORGANIZATION ADMIN PORTAL (`/organization`)
**File Location:** `src/pages/organization/`

**Pages:**
- `OrgAdminDashboard.tsx` - Main dashboard (6 tabs: Overview/Collectors/Clients/Rules/Reports/Reconciliation)
- `Reports.tsx` - Analytics & reporting

**Access Route:** `/login` → Sign in → `/organization`

---

#### 3️⃣ SUPERVISOR PORTAL (`/supervisor`)
**File Location:** `src/pages/supervisor/`

**Pages:**
- `SupervisorPortal.tsx` - Main dashboard (3 tabs: Dashboard/Collectors/Alerts)
- `Agents.tsx` - Detailed agent/collector management

**Access Route:** `/login` → Sign in → `/supervisor`

---

#### 4️⃣ COLLECTOR PORTAL (`/collector`)
**File Location:** `src/pages/collector/`

**Pages:**
- `FieldCollection.tsx` - Mobile field payment form with GPS
- `DepositWithdrawal.tsx` - Deposit declarations & withdrawal requests

**Access Route:** `/login` → Sign in → `/collector`

---

#### 5️⃣ CLIENT PORTAL (`/client`)
**File Location:** `src/pages/client/`

**Pages:**
- `ClientPortal.tsx` - Main dashboard (4 tabs: Overview/Payments/Statements/Disputes)
- `ReceiptVerification.tsx` - Verify receipts by transaction ID

**Access Route:** `/login` → Sign in → `/client`

---

#### 6️⃣ AUDITOR PORTAL (`/auditor`)
**File Location:** `src/pages/auditor/`

**Pages:**
- `AuditorPortal.tsx` - Read-only audit dashboard

**Access Route:** `/login` → Sign in → `/auditor`

---

## 🔐 Authentication Pages

### Public Pages (`src/pages/public/`)

| Page | File | Purpose | Current Status |
|------|------|---------|-----------------|
| Home | `Home.tsx` | Landing page with features overview | ✅ Marketing page |
| Login | `Login.tsx` | Unified login form for all portals | ⚠️ **NO DEMO LOGINS** |
| Features | `Features.tsx` | Feature details & benefits | ✅ Marketing page |
| Pricing | `Pricing.tsx` | Subscription plans & pricing | ✅ Marketing page |
| About | `About.tsx` | Company information | ✅ Marketing page |
| Contact | `Contact.tsx` | Contact form for sales inquiries | ✅ Marketing page |
| Demo | `Demo.tsx` | **Live collector demo** (no login needed) | ✅ Works standalone |
| Terms | `Terms.tsx` | Terms of service | ✅ Legal page |
| Privacy | `Privacy.tsx` | Privacy policy | ✅ Legal page |

---

## 🎯 Demo Access System

### Current Demo Implementation
**Location:** `/demo` route

**What It Does:**
- Shows live Collector Portal interface
- Demonstrates payment form with GPS tracking
- Simulates digital receipt generation
- **No authentication required** - anyone can access

**Features:**
- Live geolocation tracking
- Mock amount entry
- Mock client name entry
- Instant "receipt generation" feedback
- Guides to pricing/deployment

**Limitations:**
- Does not access any portal data
- Only demonstrates UI/UX flow
- No actual data persistence

---

## 🔑 Login Page Structure

### Current Login Page (`src/pages/public/Login.tsx`)

**Form Fields:**
1. **Subdomain/Organization** - Input field with `.procollector.com` suffix
2. **Email Address** - Standard email input
3. **Password** - Password input with "Forgot?" link

**Current Issues:**
- ❌ **No demo logins provided**
- ❌ **No instructions on test credentials**
- ❌ **No quick-access buttons to each portal**
- ✅ Has testimonial/review on left side (should remove per request)

**Current Routing:**
- Sign in button links to `/dashboard`
- "Don't have account?" links to `/contact`

---

## 🚀 What Needs to Be Done

### 1. Add Demo Login Credentials to Login Page
```
Demo Logins to Add:

System Admin:
  - Email: admin@demo.procollector.com
  - Password: demo123
  - Subdomain: demo

Organization Admin:
  - Email: manager@demo.procollector.com
  - Password: demo123
  - Subdomain: demo

Supervisor:
  - Email: supervisor@demo.procollector.com
  - Password: demo123
  - Subdomain: demo

Collector:
  - Email: collector@demo.procollector.com
  - Password: demo123
  - Subdomain: demo

Client:
  - Email: client@demo.procollector.com
  - Password: demo123
  - Subdomain: demo

Auditor:
  - Email: auditor@demo.procollector.com
  - Password: demo123
  - Subdomain: demo
```

### 2. Remove Testimonial/Review from Login Page
- Currently has review quote on left side
- Should be removed as per user request

### 3. Add Demo Access Buttons
- Quick access buttons for each portal demo
- Or dynamic demo login system
- Instant access without manual form entry

### 4. Create Demo Account System
- Implement demo mode for all portals
- Use mock data instead of real data
- Allow users to test all functionality

---

## 📁 Complete Pages File Listing

```
src/pages/
├── admin/                          [System Admin Portal]
│   ├── GlobalOverview.tsx
│   ├── Organizations.tsx
│   ├── Collections.tsx
│   └── CSVImport.tsx
│
├── organization/                   [Organization Admin Portal]
│   ├── OrgAdminDashboard.tsx
│   └── Reports.tsx
│
├── supervisor/                     [Supervisor Portal]
│   ├── SupervisorPortal.tsx
│   └── Agents.tsx
│
├── collector/                      [Collector Portal]
│   ├── FieldCollection.tsx
│   └── DepositWithdrawal.tsx
│
├── client/                         [Client Portal]
│   ├── ClientPortal.tsx
│   └── ReceiptVerification.tsx
│
├── auditor/                        [Auditor Portal]
│   └── AuditorPortal.tsx
│
├── dashboard/                      [General Dashboard]
│   ├── Overview.tsx
│   └── Settings.tsx
│
└── public/                         [Public/Auth Pages]
    ├── Home.tsx                    (Landing page)
    ├── Login.tsx                   (Auth - LOGIN FORM)
    ├── Features.tsx                (Marketing)
    ├── Pricing.tsx                 (Marketing)
    ├── About.tsx                   (Marketing)
    ├── Contact.tsx                 (Marketing)
    ├── Demo.tsx                    (Live demo - no login)
    ├── Terms.tsx                   (Legal)
    └── Privacy.tsx                 (Legal)
```

---

## 🔄 User Flow

### Current Flow
```
User Visits Site
  ↓
Home Page (/home)
  ↓
  ├─→ Explore Features (/features)
  ├─→ View Pricing (/pricing)
  ├─→ Try Live Demo (/demo)  ← NO LOGIN REQUIRED
  ├─→ About Us (/about)
  └─→ Sign In (/login)
       ↓
       [Manual Credentials Entry]
       ↓
       Protected Portal
       ├─→ /admin (System Admin)
       ├─→ /organization (Org Admin)
       ├─→ /supervisor (Supervisor)
       ├─→ /collector (Collector)
       ├─→ /client (Client)
       └─→ /auditor (Auditor)
```

### Proposed Better Flow
```
User Visits Site
  ↓
Home Page (/home)
  ↓
  ├─→ Explore Features (/features)
  ├─→ View Pricing (/pricing)
  ├─→ Try Live Demo (/demo)  ← NO LOGIN REQUIRED
  ├─→ About Us (/about)
  └─→ Sign In (/login)
       ↓
       [Show Demo Login Options]
       ├─→ Demo System Admin   (Click to access)
       ├─→ Demo Org Admin      (Click to access)
       ├─→ Demo Supervisor     (Click to access)
       ├─→ Demo Collector      (Click to access)
       ├─→ Demo Client         (Click to access)
       └─→ Demo Auditor        (Click to access)
       ↓
       [OR Manual Login for Real Accounts]
```

---

## ✅ Summary

**Total Portals:** 6 protected portals  
**Total Pages:** 23 portal pages + 9 public pages  
**Auth Pages:** 1 (Login.tsx)  
**Demo Access:** 1 page (Demo.tsx for Collector only)  

**Current Status:**
- ✅ All portals implemented
- ✅ Login page exists but needs improvement
- ❌ No demo login credentials visible
- ❌ No quick demo access buttons
- ⚠️ Has testimonial that should be removed
- ⚠️ Demo only covers Collector, not all portals

