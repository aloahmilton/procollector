# Notification System - Structure & Specification

## Overview
This document defines the notification system structure for ProCollector.

## Notification Module Structure

```
backend/src/modules/notifications/
├── notifications.module.ts
├── notifications.service.ts
├── notifications.controller.ts
├── dto/
│   ├── send-email.dto.ts
│   └── send-notification.dto.ts
├── templates/
│   ├── welcome.hbs
│   ├── deposit-confirmation.hbs
│   ├── daily-report.hbs
│   └── password-reset.hbs
└── processors/
    └── email.processor.ts
```

## Notification Types

1. **Email Notifications** (Primary)
   - User registration
   - Deposit confirmations
   - Daily/weekly/monthly reports
   - Password reset
   - Organization approval

2. **SMS Notifications** (Future)
   - Transaction alerts
   - Security notifications

3. **Push Notifications** (Future - Mobile)
   - Real-time deposit updates
   - Sync completion
   - Payment status

## Configuration

### Environment Variables Required
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@procollector.net
```

## Dependencies
```bash
npm install nodemailer @nestjs/bull bull ioredis handlebars
```

## Email Templates Location
`backend/src/modules/notifications/templates/`

## Queue System
- Use Bull + Redis for async email processing
- Prevents blocking on email sending
- Retry failed notifications

## Admin Controls
- Enable/disable notification types per organization
- Configure SMTP settings
- View notification logs
- Resend failed notifications

## Status
- ⏳ To be implemented
- Structure defined
- Dependencies listed
