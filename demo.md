Here is the **final, clean, detailed description** of the **/demo portal system** exactly as you described — structured clearly so your developers (or AI agents) can implement it perfectly.

---

# 🟩 **ProCollector — Demo Portal Specification (/demo)**

*A guided, role-based demonstration experience for potential clients.*

---

## 🎯 **Purpose of the /demo Portal**

The **/demo** portal allows prospects to test the system before subscribing.
It showcases the **Manager**, **Collector**, and **Customer** dashboards — each with its own demo login.

This demo does **not** use real production data.
It uses a **pre-seeded demo dataset** stored in the database.

---

# ⭐ **/demo — Full Feature Specification**

## 📌 **URL**

```
https://procollector.net/demo
```

---

## 🧭 **Step 1 — Demo Access Request Form**

Before a user can access demo logins, they must fill a form:

### **Required Fields**

* Full Name
* Company Name
* Phone Number
* Email Address (optional but recommended)

### **After submission**

* Data is saved in table: `demo_requests`
* An email is sent to them:
  “Thanks for requesting access. Your demo credentials are ready below.”
* They are immediately redirected to **/demo-access** page

---

# 🧭 **Step 2 — Demo Role Selector Page**

After submitting the demo request, the user sees 3 toggle cards:

```
[ Manager Demo ]   [ Collector Demo ]   [ Customer Demo ]
```

Toggling any of them reveals:

* Demo Username
* Demo Password
* A **Login to Demo** button

---

## 🔒 **Demo Credentials (Pre-set)**

These credentials are fixed and stored in the DB:

### **Manager Demo**

```
Email: manager.demo@procollector.com
Password: ManagerDemo@123
```

### **Collector Demo**

```
Email: collector.demo@procollector.com
Password: CollectorDemo@123
```

### **Customer Demo**

```
Email: customer.demo@procollector.com
Password: CustomerDemo@123
```

You can modify them anytime.

---

## 🧠 **Logic**

### ✔ Users DO NOT create demo accounts

Demo accounts already exist in the database.

### ✔ When user clicks “Login to Demo”

They are redirected to:

| Role      | Redirect to                      |
| --------- | -------------------------------- |
| Manager   | `/manager/dashboard?demo=true`   |
| Collector | `/collector/dashboard?demo=true` |
| Customer  | `/customer/dashboard?demo=true`  |

The system identifies:

* The login is demo
* No real data is affected
* Demo data is isolated under `organization_id = DEMO`

---

# 🛡️ **Demo Data Storage**

Use dedicated IDs:

```
organization_id: DEMO
user_type: manager / collector / customer
```

Demo data includes:

* Fake customers
* Fake transactions
* Fake reports
* Fake collectors
* Fake organization profile

This ensures:
✔ Real organizations are untouched
✔ Demo users cannot access real data
✔ Resetting demo data is easy

---

# 📩 **Email Notification**

When someone requests demo access:

### Subject:

```
ProCollector Demo Access — Powered by Altonixa
```

### Body:

```
Hello {fullname},

Thank you for requesting demo access to ProCollector.

Below are your demo login options:
- Manager Demo
- Collector Demo
- Customer Demo

You can access all demo dashboards at: https://procollector.net/demo

This demo is powered by Altonixa.

Regards,
ProCollector Team
```

Uses SMTP (or SendGrid/Mailgun if enabled).

---

# 🎨 **UI Notes**

### Demo Page Branding:

* Background: **Dust Gold**
* Header / Footer: **Dark Green**
* Buttons: **White text on green**
* Altonixa (“Powered by Altonixa”) at the bottom of the page

---

# 🏗️ **Tables Needed**

### 1. `demo_requests`

```
id
fullname
company
phone
email
ip_address
created_at
```

### 2. Demo Users

Already seeded into `users` table under:

```
organization_id = 'DEMO'
```

### 3. Demo Data

Seed tables:

* collectors
* customers
* transactions
* reports
* organization settings for "Demo Bank"

---

# ✔ Developer Requirements Summary

### Backend

* Add POST `/demo/request-access`
* Add GET `/demo/demo-users`
* Add route protection: demo users → demo-only data
* Seed demo users + demo data

### Frontend (Next.js)

* `/demo` → form
* `/demo-access` → toggle interface
* Buttons redirect to login with pre-filled credentials

### Mobile Apps

Collectors & customers can sign in using demo credentials too.

---

# ❤️ Footer Text

Displayed on both pages:

```
Powered by Altonixa
```

---

# 🔥 **If you want, I can generate next:**

✔ API routes for /demo
✔ Database seed scripts
✔ UI mockups
✔ Email templates
✔ ERD integration
✔ Full implementation guide

Just say: **“Continue with API routes”** or **“Generate seed scripts”**.
