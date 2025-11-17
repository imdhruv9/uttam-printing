# 🚀 Uttam Printing - Complete Deployment Guide

This guide will walk you through deploying your React + Spring Boot + PostgreSQL application to production.

---

## 📊 **Deployment Architecture**

```
Frontend (React + Vite)
    ↓ (deployed to)
Netlify/Vercel (FREE)
    ↓ (calls API)
Backend (Spring Boot)
    ↓ (deployed to)
Railway ($5/month)
    ↓ (connects to)
PostgreSQL Database
    ↓ (hosted on)
Railway (included)
```

---

## 🎯 **Phase 1: Prepare Your Code (30 minutes)**

### Step 1.1: Update Backend for Production

#### A. Create Production Application Config

File: `backend/src/main/resources/application-prod.yml`

```yaml
spring:
  application:
    name: printingpro
  datasource:
    url: ${DATABASE_URL}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: false
        use_sql_comments: false
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true
  servlet:
    multipart:
      enabled: true
      max-file-size: 10MB
      max-request-size: 20MB
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true

server:
  port: ${PORT:8080}
  error:
    include-message: true
    include-stacktrace: never

jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:86400000}

file:
  upload-dir: ${FILE_UPLOAD_DIR:./uploads}

mail:
  from: ${MAIL_FROM:imdhruv2209@gmail.com}
  to: ${MAIL_TO:uttamprinting@zohomail.in}

logging:
  level:
    root: INFO
    com.printingpro: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
```

#### B. Update CORS Configuration

File: `backend/src/main/java/com/printingpro/config/SecurityConfig.java`

Find the CORS configuration and update it:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // In production, replace with your actual frontend domain
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",           // Local development
        "https://uttamprinting.netlify.app", // Your Netlify domain (update this!)
        "https://your-custom-domain.com"    // Your custom domain (if any)
    ));
    
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

### Step 1.2: Update Frontend for Production

#### A. Create Production Environment File

File: `frontend/.env.production`

```env
# This will be updated after backend deployment
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

#### B. Update API Configuration (Optional - for better error handling)

File: `frontend/src/services/api.ts`

Make sure the base URL uses environment variable:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084/api';
```

---

### Step 1.3: Security Updates

#### A. Generate Strong JWT Secret

Open PowerShell and run:

```powershell
# Generate a random 256-bit secret
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)
Write-Host "Your JWT Secret: $secret"
```

**Save this secret!** You'll need it for deployment.

#### B. Update .gitignore

Ensure these are in `.gitignore`:

```gitignore
# Environment files
backend/.env
frontend/.env
frontend/.env.production.local

# Uploads
backend/uploads/

# Logs
*.log

# Build artifacts
backend/target/
frontend/dist/
frontend/node_modules/
```

---

## 🎯 **Phase 2: Deploy Database (5 minutes)**

### Option A: Railway (Recommended)

1. **Sign up for Railway**
   - Go to: https://railway.app
   - Sign up with GitHub (FREE)

2. **Create New Project**
   - Click "New Project"
   - Select "Provision PostgreSQL"
   - Database is created instantly!

3. **Get Database URL**
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy the **DATABASE_URL** (looks like: `postgresql://user:pass@host:port/dbname`)
   - **Save this URL!** You'll need it for backend deployment

4. **Note Database Credentials**
   ```
   DATABASE_URL: postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway
   ```

---

## 🎯 **Phase 3: Deploy Backend (15 minutes)**

### Option A: Railway (Recommended for Spring Boot)

#### Step 3.1: Prepare Backend

1. **Add Railway Configuration**

Create file: `backend/railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "./mvnw clean package -DskipTests"
  },
  "deploy": {
    "startCommand": "java -jar target/printingpro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Create nixpacks.toml** (tells Railway how to build)

File: `backend/nixpacks.toml`

```toml
[phases.setup]
nixPkgs = ["...", "maven"]

[phases.build]
cmds = ["./mvnw clean package -DskipTests"]

[start]
cmd = "java -jar target/printingpro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod"
```

#### Step 3.2: Deploy to Railway

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Create Backend Service on Railway**
   - Go to Railway dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will detect Spring Boot automatically

3. **Set Environment Variables**
   
   In Railway, go to your backend service → Variables tab:
   
   ```env
   # Database (copy from your PostgreSQL service)
   DATABASE_URL=postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway
   
   # JWT Secret (use the one you generated earlier)
   JWT_SECRET=your-generated-secret-from-step-1.3
   JWT_EXPIRATION=86400000
   
   # Email Configuration
   MAIL_USERNAME=imdhruv2209@gmail.com
   MAIL_PASSWORD=cprxfahnzzvvtjqn
   MAIL_FROM=imdhruv2209@gmail.com
   MAIL_TO=uttamprinting@zohomail.in
   
   # Spring Profile
   SPRING_PROFILES_ACTIVE=prod
   
   # File Upload
   FILE_UPLOAD_DIR=./uploads
   
   # Server Port (Railway provides this)
   PORT=8080
   ```

4. **Deploy!**
   - Railway automatically builds and deploys
   - Wait 3-5 minutes for first deployment
   - Check logs for "Started PrintingProApplication"

5. **Get Your Backend URL**
   - Go to Settings → Generate Domain
   - Your backend URL: `https://your-app-name.up.railway.app`
   - **Test it**: `https://your-app-name.up.railway.app/api/products`

---

### Option B: Render (Alternative - Also Good)

1. **Sign up**: https://render.com
2. **New Web Service** → Connect GitHub
3. **Configure**:
   - Name: `uttam-printing-backend`
   - Runtime: `Java`
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/printingpro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod`
4. **Add Environment Variables** (same as Railway above)
5. **Create Database**: New PostgreSQL → Copy DATABASE_URL
6. **Deploy!**

---

## 🎯 **Phase 4: Deploy Frontend (10 minutes)**

### Option A: Netlify (Recommended - Easiest)

#### Step 4.1: Update Frontend Configuration

1. **Update `.env.production`**
   ```env
   VITE_API_BASE_URL=https://your-backend-name.up.railway.app/api
   ```
   *(Use your actual Railway backend URL from Phase 3)*

2. **Create Netlify Configuration**

File: `frontend/netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Step 4.2: Deploy to Netlify

**Method 1: Via Netlify Dashboard (Easier)**

1. **Build Frontend Locally**
   ```powershell
   cd frontend
   npm run build
   ```
   This creates a `dist/` folder

2. **Manual Deploy**
   - Go to: https://app.netlify.com
   - Sign up with GitHub (FREE)
   - Click "Sites" → "Add new site" → "Deploy manually"
   - Drag and drop the `dist/` folder
   - Done! Your site is live!

3. **Get Your URL**
   - Netlify gives you: `https://random-name.netlify.app`
   - You can change the name in Site Settings

**Method 2: Via Git (Better for updates)**

1. **Push Frontend to GitHub** (if not already)
   
2. **Connect to Netlify**
   - Netlify Dashboard → "Add new site" → "Import from Git"
   - Select your repository
   - **Configure**:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/dist`
   - **Environment Variables**:
     ```
     VITE_API_BASE_URL=https://your-backend.railway.app/api
     ```

3. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site is live!

#### Step 4.3: Update Backend CORS

Now that you have your frontend URL, update backend CORS:

1. **Add Netlify URL to CORS**
   
   In Railway (Backend Service → Variables), add:
   ```env
   FRONTEND_URL=https://your-app.netlify.app
   ```

2. **Update SecurityConfig.java** to use environment variable:
   ```java
   configuration.setAllowedOrigins(Arrays.asList(
       "http://localhost:3000",
       System.getenv("FRONTEND_URL")
   ));
   ```

3. **Redeploy Backend**
   - Push changes to GitHub
   - Railway auto-deploys

---

### Option B: Vercel (Alternative)

1. **Sign up**: https://vercel.com
2. **Import Git Repository**
3. **Configure**:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variable**:
   ```
   VITE_API_BASE_URL=https://your-backend.railway.app/api
   ```
5. **Deploy!**

---

## 🎯 **Phase 5: Database Migration (2 minutes)**

Your Flyway migrations will run automatically on first backend startup!

To verify:

1. **Check Backend Logs on Railway**
   - Look for: `Flyway: Successfully applied 2 migrations`
   - Look for: `Started PrintingProApplication`

2. **Test API**
   ```
   GET https://your-backend.railway.app/api/products
   ```
   Should return the seeded products!

---

## 🎯 **Phase 6: Final Testing (10 minutes)**

### Checklist:

#### Backend Tests:
```bash
# Test Products API
curl https://your-backend.railway.app/api/products

# Test Login
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin@uttamprinting.com","password":"Admin@123456"}'
```

#### Frontend Tests:
1. ✅ Open: `https://your-app.netlify.app`
2. ✅ Browse products
3. ✅ Click on a product
4. ✅ Test contact form
5. ✅ Test Google Maps link
6. ✅ Login as admin
7. ✅ Upload a product image
8. ✅ Create a new product
9. ✅ Check email received at `uttamprinting@zohomail.in`

---

## 🎯 **Phase 7: Custom Domain (Optional - 15 minutes)**

### If You Want `www.uttamprinting.com`:

1. **Buy Domain** (₹500-₹1000/year)
   - Namecheap, GoDaddy, or Hostinger

2. **Configure Netlify**
   - Netlify Dashboard → Domain Settings
   - Add custom domain
   - Follow DNS instructions

3. **Update CORS**
   - Add your domain to backend CORS configuration

---

## 💰 **Cost Breakdown**

| Service | Free Tier | Paid Option | Your Cost |
|---------|-----------|-------------|-----------|
| **Frontend (Netlify)** | 100GB bandwidth, unlimited sites | $19/month Pro | **$0** ✅ |
| **Backend (Railway)** | $5 credit/month | $5/month + usage | **$0-$5** |
| **Database (Railway)** | Included in backend | Included | **$0** |
| **Domain (Optional)** | - | ₹500-₹1000/year | **Optional** |
| **Total** | | | **$0-$5/month** |

For 50 users/month, you'll likely stay in free tier! 🎉

---

## 🔒 **Security Checklist**

Before going live:

- [ ] Changed JWT_SECRET to strong random string
- [ ] Database password is strong
- [ ] CORS configured for production domain only
- [ ] No credentials in GitHub repository
- [ ] .env files in .gitignore
- [ ] HTTPS enabled (automatic on Netlify/Railway)
- [ ] Email app password secured
- [ ] Admin password changed from default

---

## 🐛 **Common Deployment Issues & Fixes**

### Issue 1: Backend Build Fails
```
Error: Could not find or load main class
```
**Fix**: Ensure `mvnw` has execute permissions
```bash
git update-index --chmod=+x mvnw
git commit -m "Fix mvnw permissions"
git push
```

### Issue 2: Database Connection Failed
```
Error: Connection to database failed
```
**Fix**: 
- Check DATABASE_URL is correct in Railway variables
- Ensure PostgreSQL service is running
- Check if database allows external connections

### Issue 3: CORS Error in Frontend
```
Error: Access to fetch blocked by CORS policy
```
**Fix**:
- Add your Netlify URL to backend CORS configuration
- Redeploy backend
- Clear browser cache

### Issue 4: Email Not Sending
```
Error: Authentication failed
```
**Fix**:
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure MAIL_USERNAME and MAIL_PASSWORD are set in Railway

### Issue 5: Images Not Loading
```
404 on image URLs
```
**Fix**:
- Images in `./uploads` will work on Railway
- For better reliability, consider adding Cloudflare R2 later
- Check file upload directory exists

---

## 📊 **Monitoring & Maintenance**

### Check Application Health:

1. **Backend Health**
   - Railway Dashboard → View Logs
   - Check for errors

2. **Frontend Health**
   - Netlify Dashboard → View deployment logs
   - Check build succeeded

3. **Database Health**
   - Railway → PostgreSQL service → Metrics
   - Check disk usage

### Backup Strategy:

1. **Database Backups** (Railway automatic)
   - Railway backs up automatically
   - Can restore from dashboard

2. **Code Backups**
   - Git repository is your backup
   - Keep it updated!

---

## 🚀 **Continuous Deployment (Auto-updates)**

Once set up:

1. **Make changes locally**
2. **Test locally**
3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
4. **Automatic deployment!**
   - Railway deploys backend automatically
   - Netlify deploys frontend automatically
   - Takes 2-5 minutes

---

## 📱 **Mobile Optimization Checklist**

Your app is already mobile-ready, but verify:

- [ ] Test on mobile browser
- [ ] Google Maps opens correctly
- [ ] Phone number is clickable
- [ ] Forms work on mobile
- [ ] Images load properly
- [ ] Navigation works

---

## ✅ **Deployment Complete!**

Your application should now be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Secured with HTTPS
- ✅ Auto-deploying on Git push
- ✅ Backed up automatically
- ✅ Monitored and logged

**Your URLs:**
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-backend.railway.app`
- Database: Managed by Railway

---

## 🆘 **Need Help?**

Common support resources:
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- PostgreSQL on Railway: https://docs.railway.app/databases/postgresql

---

**Congratulations! Your Uttam Printing website is now live! 🎉**

Share the link with customers and start receiving orders!

