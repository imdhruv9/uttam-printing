# Printing Pro - Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Security Updates Required

⚠️ **CRITICAL: Change these before deploying to production!**

#### Backend Configuration (`backend/src/main/resources/application.yml`)

```yaml
jwt:
  secret: CHANGE-THIS-TO-A-STRONG-RANDOM-SECRET-AT-LEAST-256-BITS
  expiration: 86400000  # 24 hours in milliseconds
```

**Generate a strong JWT secret:**
```bash
# Use this command to generate a secure random secret
openssl rand -base64 64
```

#### Database Configuration

Update in `application.yml` or environment variables:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://YOUR_DB_HOST:5432/YOUR_DB_NAME
    username: YOUR_DB_USER
    password: YOUR_DB_PASSWORD
```

### 2. Admin User Password

⚠️ **IMPORTANT**: Change the default admin password!

Run this SQL in your production database:
```sql
-- Generate new hash using BCrypt
-- Replace YOUR_HASHED_PASSWORD with BCrypt hash of your new password
UPDATE users 
SET password_hash = 'YOUR_HASHED_PASSWORD'
WHERE username = 'admin@printingpro.com';
```

Use a BCrypt generator: https://bcrypt-generator.com/
- Cost factor: 10 or higher

---

## 🚀 Deployment Steps

### Backend Deployment

#### Option 1: JAR Deployment

1. **Build the application:**
   ```bash
   cd backend
   ./mvnw clean package -DskipTests
   ```

2. **Run the JAR:**
   ```bash
   java -jar target/printingpro-0.0.1-SNAPSHOT.jar \
     --spring.profiles.active=prod \
     --spring.datasource.url=jdbc:postgresql://YOUR_HOST:5432/YOUR_DB \
     --spring.datasource.username=YOUR_USER \
     --spring.datasource.password=YOUR_PASSWORD \
     --jwt.secret=YOUR_SECRET
   ```

#### Option 2: Docker Deployment

1. **Build Docker image:**
   ```bash
   cd backend
   docker build -t printingpro-backend .
   ```

2. **Run container:**
   ```bash
   docker run -d \
     -p 8084:8084 \
     -e SPRING_PROFILES_ACTIVE=prod \
     -e DB_HOST=your_db_host \
     -e DB_PORT=5432 \
     -e DB_NAME=your_db_name \
     -e DB_USERNAME=your_db_user \
     -e DB_PASSWORD=your_db_password \
     -e JWT_SECRET=your_jwt_secret \
     --name printingpro-backend \
     printingpro-backend
   ```

### Frontend Deployment

#### Option 1: Static Build

1. **Update API URL:**
   Create `frontend/.env.production`:
   ```
   VITE_API_BASE_URL=https://your-api-domain.com/api
   ```

2. **Build:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy `dist/` folder** to:
   - Nginx
   - Apache
   - Netlify
   - Vercel
   - AWS S3 + CloudFront

#### Option 2: Docker Deployment

1. **Build Docker image:**
   ```bash
   cd frontend
   docker build -t printingpro-frontend .
   ```

2. **Run container:**
   ```bash
   docker run -d \
     -p 80:80 \
     --name printingpro-frontend \
     printingpro-frontend
   ```

---

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

```sql
CREATE DATABASE your_production_db;
```

### 2. Migrations Will Run Automatically

Flyway will automatically:
- Create tables
- Insert initial admin user
- Seed sample products

### 3. Update Admin Password (Important!)

After first deployment:
```sql
-- Generate hash at: https://bcrypt-generator.com/
UPDATE users 
SET password_hash = 'YOUR_NEW_BCRYPT_HASH'
WHERE username = 'admin@printingpro.com';
```

---

## 🔒 Production Security Checklist

- [ ] Changed JWT secret
- [ ] Changed admin password
- [ ] Updated database credentials
- [ ] Enabled HTTPS/SSL
- [ ] Configured proper CORS origins
- [ ] Enabled firewall rules
- [ ] Set up database backups
- [ ] Configured rate limiting (optional)
- [ ] Set up monitoring/logging
- [ ] Disabled Swagger in production (optional)

---

## 📦 Environment Variables

### Backend (.env or system environment)

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=printingpro
DB_USERNAME=postgres
DB_PASSWORD=secure_password

# JWT
JWT_SECRET=your-super-secret-256-bit-key
JWT_EXPIRATION=86400000

# File Storage
FILE_UPLOAD_DIR=/app/uploads
FILE_MAX_SIZE=10485760

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Frontend (.env.production)

```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

---

## 🌐 Recommended Deployment Platforms

### Backend
- **AWS EC2** + PostgreSQL RDS
- **Heroku** (with PostgreSQL add-on)
- **DigitalOcean App Platform**
- **Google Cloud Run**
- **Railway**

### Frontend
- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Nginx** on VPS

### Database
- **AWS RDS PostgreSQL**
- **DigitalOcean Managed PostgreSQL**
- **Heroku Postgres**
- **Supabase**

---

## 📝 Post-Deployment Testing

1. **Test Login:**
   ```bash
   curl -X POST https://your-api.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin@printingpro.com","password":"YOUR_NEW_PASSWORD"}'
   ```

2. **Test Products API:**
   ```bash
   curl https://your-api.com/api/products
   ```

3. **Test Frontend:**
   - Open https://your-frontend-domain.com
   - Login with admin credentials
   - Create a test product
   - Submit a contact form

---

## 🆘 Troubleshooting

### Backend Won't Start
- Check database connection
- Verify JWT secret is set
- Check logs: `tail -f logs/spring.log`

### Frontend Can't Connect
- Verify CORS settings in `SecurityConfig.java`
- Check `VITE_API_BASE_URL` in `.env.production`
- Verify API is accessible

### Database Connection Failed
- Check firewall rules
- Verify database credentials
- Ensure database accepts remote connections

---

## 📞 Support

For issues, check:
- Application logs
- Database logs
- Network/firewall settings

---

**🎉 Your application is ready for deployment!**

