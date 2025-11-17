# 🚀 Printing Pro - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17+ ([Download](https://adoptium.net/))
- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))

## Step 1: Clone or Navigate to Project

```powershell
cd C:\Users\LENOVO-T480S\Desktop\printing
```

## Step 2: Run Setup (First Time Only)

```powershell
.\setup.ps1
```

This script will:
- ✅ Check prerequisites
- ✅ Create configuration files
- ✅ Start PostgreSQL container
- ✅ Install frontend dependencies
- ✅ Create upload directory

**⏱️ Takes about 2-3 minutes**

## Step 3: Start Backend

Open a PowerShell terminal and run:

```powershell
.\run-backend.ps1
```

Wait for the message:
```
Started PrintingProApplication in X.XXX seconds
```

✅ **Backend is ready!**

## Step 4: Start Frontend

Open a **NEW** PowerShell terminal and run:

```powershell
.\run-frontend.ps1
```

Wait for the message:
```
Local: http://localhost:3000/
```

✅ **Frontend is ready!**

## Step 5: Access the Application

1. **Open your browser** and go to: http://localhost:3000

2. **Browse products** as a visitor (no login required)

3. **Login as admin**:
   - Click "Admin Login" in the header
   - Use the admin credentials from your database setup

4. **Manage products** in the Admin Panel

## Quick Command Reference

### First Time Setup
```powershell
.\setup.ps1                    # One-time setup
```

### Daily Development
```powershell
# Terminal 1 - Backend
.\run-backend.ps1

# Terminal 2 - Frontend  
.\run-frontend.ps1
```

### Stop Everything
```powershell
# Press Ctrl+C in each terminal
# Stop Docker containers
docker-compose down
```

### Restart Database
```powershell
docker-compose down
docker-compose up -d
```

### Run Tests
```powershell
# Backend tests
cd backend
.\mvnw.cmd test

# Frontend tests
cd frontend
npm test
```

## Useful URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:8084 |
| **Swagger UI** | http://localhost:8084/swagger-ui.html |
| **PostgreSQL** | localhost:5432 |

## Common Issues & Solutions

### Issue: Port already in use

**Backend (8084):**
```powershell
# Find process using port
netstat -ano | findstr :8084
# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Frontend (3000):**
```powershell
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Database connection failed

```powershell
# Check if PostgreSQL is running
docker ps

# Restart PostgreSQL
docker-compose down
docker-compose up -d

# Wait 10 seconds for startup
Start-Sleep -Seconds 10
```

### Issue: Maven not found

```powershell
# In backend directory
cd backend
# Generate Maven wrapper
mvn -N io.takari:maven:wrapper
```

### Issue: npm install fails

```powershell
cd frontend
# Clear cache and reinstall
npm cache clean --force
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## What You Can Do Now

### As a Visitor (No Login)
✅ Browse all products
✅ View product details
✅ Use price calculator
✅ Submit contact forms
✅ Filter and search products

### As Admin (After Login)
✅ Create new products
✅ Upload product images
✅ Edit existing products
✅ Delete products
✅ View analytics
✅ See product counts by category

## Next Steps

1. **Explore the app** - Browse products, try the price calculator
2. **Login as admin** - Create, edit, and delete products
3. **Test the API** - Import `Postman_Collection.json` into Postman
4. **Review the code** - Check out the clean architecture
5. **Run tests** - See comprehensive test coverage
6. **Read documentation** - Check `README.md` for detailed info

## Testing the Application

### Quick Feature Test

1. **Browse Products**
   - Go to home page
   - Search for "banner"
   - Filter by category
   - Click on a product

2. **Price Calculator**
   - On product page, scroll to calculator
   - Enter width: 48 (inches)
   - Enter height: 36 (inches)
   - See estimated price

3. **Contact Form**
   - Go to "Contact Us"
   - Fill in your details
   - Submit the form

4. **Admin Features**
   - Login with admin credentials
   - Go to "Admin Panel"
   - Click "Add Product"
   - Upload an image
   - Fill in product details
   - Create the product
   - See it appear on home page

## Troubleshooting Commands

```powershell
# Check Java version
java -version

# Check Node version
node --version

# Check npm version
npm --version

# Check Docker status
docker --version
docker ps

# Check running processes
Get-Process | Where-Object {$_.ProcessName -match "java|node"}

# Check ports in use
netstat -ano | findstr "8084 3000 5432"

# View backend logs
# (Logs appear in the terminal where backend is running)

# View Docker logs
docker-compose logs postgres
```

## Clean Start (If Everything Fails)

```powershell
# Stop everything
docker-compose down -v
Get-Process | Where-Object {$_.ProcessName -match "java|node"} | Stop-Process -Force

# Clean backend
cd backend
.\mvnw.cmd clean
Remove-Item -Recurse -Force target

# Clean frontend
cd ../frontend
Remove-Item -Recurse -Force node_modules, dist

# Run setup again
cd ..
.\setup.ps1
```

## Getting Help

- 📖 **Detailed docs**: See `README.md`
- 🐛 **Found a bug**: Open an issue
- 💡 **Need help**: Check `CONTRIBUTING.md`
- 📊 **API docs**: Visit Swagger UI

## Development Tips

### Hot Reload

- **Frontend**: Changes automatically reload in browser
- **Backend**: Changes require restart (Ctrl+C, then rerun)

### Environment Variables

Edit these files if you need to change config:
- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration

### Database Access

Connect to PostgreSQL:
```
Host: localhost
Port: 5432
Database: printingpro
Username: postgres
Password: postgres123
```

Use any PostgreSQL client (DBeaver, pgAdmin, etc.)

### API Testing

1. Import `Postman_Collection.json` into Postman
2. Set environment variable `base_url` to `http://localhost:8084`
3. Login to get JWT token (auto-saved)
4. Test all endpoints

---

## 🎉 You're Ready!

You should now have:
- ✅ Backend running on port 8084
- ✅ Frontend running on port 3000
- ✅ PostgreSQL running in Docker
- ✅ Sample data loaded
- ✅ Admin access configured

**Happy coding! 🚀**

---

*Last updated: October 2024*

