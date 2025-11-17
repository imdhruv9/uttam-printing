# Environment Variables Template

This file lists all required environment variables for the application.

## 🔒 **IMPORTANT: Never commit actual credentials!**

---

## **Local Development**

Create `backend/.env` with:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=printing
DB_USERNAME=postgres
DB_PASSWORD=root

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-256-bits
JWT_EXPIRATION=86400000

# Email Configuration (Gmail)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=destination-email@example.com

# File Upload
FILE_UPLOAD_DIR=./uploads

# Server Port
SERVER_PORT=8084
```

---

## **Production Deployment (Railway)**

Set these environment variables in Railway dashboard:

```env
# Database (Railway provides this automatically)
DATABASE_URL=postgresql://...

# JWT Configuration
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRATION=86400000

# Email Configuration
MAIL_USERNAME=<your-gmail>
MAIL_PASSWORD=<your-gmail-app-password>
MAIL_FROM=<your-gmail>
MAIL_TO=<business-email>

# Spring Profile
SPRING_PROFILES_ACTIVE=prod

# File Upload
FILE_UPLOAD_DIR=./uploads

# Server Port (Railway provides this)
PORT=8080
```

---

## **Frontend Environment**

Create `frontend/.env.production` with:

```env
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

---

## 🔐 **Security Notes:**

1. **Never commit** `.env` files to Git
2. **Never hardcode** credentials in code
3. **Use strong JWT secret** (min 256 bits)
4. **Use Gmail App Password** (not regular password)
5. **Change all defaults** in production

---

## 📝 **How to Generate JWT Secret:**

```powershell
# PowerShell
[Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))
```

---

## 📧 **How to Get Gmail App Password:**

1. Enable 2-Step Verification on Gmail
2. Go to: https://myaccount.google.com/apppasswords
3. Generate new app password
4. Use the 16-character password (remove spaces)

