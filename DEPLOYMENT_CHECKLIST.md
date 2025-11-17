# 🚀 Quick Deployment Checklist

Use this checklist to deploy Uttam Printing step-by-step.

---

## ☑️ Pre-Deployment (Before You Start)

- [ ] Code is working locally
- [ ] All tests pass
- [ ] Git repository is up to date
- [ ] You have a GitHub account
- [ ] You have a Railway account (sign up: https://railway.app)
- [ ] You have a Netlify account (sign up: https://netlify.com)

---

## ☑️ Phase 1: Code Preparation (30 minutes)

### Security:
- [ ] Generate strong JWT secret (see DEPLOYMENT_GUIDE.md)
- [ ] Save JWT secret somewhere safe
- [ ] Verify `.gitignore` includes `backend/.env` and `frontend/.env`

### Backend:
- [ ] `application-prod.yml` created ✅ (already done)
- [ ] `railway.json` created ✅ (already done)
- [ ] `nixpacks.toml` created ✅ (already done)

### Frontend:
- [ ] `.env.production` created ✅ (already done)
- [ ] `netlify.toml` created ✅ (already done)

### Git:
- [ ] Commit all changes: `git add .`
- [ ] `git commit -m "Production ready"`
- [ ] `git push origin main`

---

## ☑️ Phase 2: Database Deployment (5 minutes)

### Railway PostgreSQL:
- [ ] Signed up for Railway
- [ ] Created new project
- [ ] Provisioned PostgreSQL
- [ ] Copied `DATABASE_URL` from Railway
- [ ] Saved DATABASE_URL somewhere safe

**DATABASE_URL looks like:**
```
postgresql://postgres:password@host.railway.app:5432/railway
```

---

## ☑️ Phase 3: Backend Deployment (15 minutes)

### Railway Backend:
- [ ] Created new service from GitHub repo
- [ ] Selected correct repository and branch
- [ ] Added environment variables:
  - [ ] `DATABASE_URL` (from Phase 2)
  - [ ] `JWT_SECRET` (generated in Phase 1)
  - [ ] `JWT_EXPIRATION=86400000`
  - [ ] `MAIL_USERNAME=imdhruv2209@gmail.com`
  - [ ] `MAIL_PASSWORD=cprxfahnzzvvtjqn`
  - [ ] `MAIL_FROM=imdhruv2209@gmail.com`
  - [ ] `MAIL_TO=uttamprinting@zohomail.in`
  - [ ] `SPRING_PROFILES_ACTIVE=prod`
  - [ ] `FILE_UPLOAD_DIR=./uploads`
  - [ ] `PORT=8080`
- [ ] Generated domain for backend
- [ ] Deployment succeeded (check logs)
- [ ] Backend URL: `https://_____________.railway.app`
- [ ] Tested: `https://your-backend.railway.app/api/products`

---

## ☑️ Phase 4: Frontend Deployment (10 minutes)

### Update Configuration:
- [ ] Updated `frontend/.env.production` with backend URL
- [ ] Committed and pushed changes

### Netlify Deployment:
- [ ] Signed up for Netlify
- [ ] Created new site from Git
- [ ] Selected repository
- [ ] Configured build settings:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `frontend/dist`
- [ ] Added environment variable: `VITE_API_BASE_URL=https://your-backend.railway.app/api`
- [ ] Deployment succeeded
- [ ] Frontend URL: `https://_____________.netlify.app`

---

## ☑️ Phase 5: CORS Update (5 minutes)

### Backend CORS Configuration:
- [ ] Added Netlify URL to backend environment variables
- [ ] Variable name: `FRONTEND_URL`
- [ ] Variable value: `https://your-app.netlify.app`
- [ ] Updated SecurityConfig.java (if needed)
- [ ] Redeployed backend

---

## ☑️ Phase 6: Testing (15 minutes)

### Backend API Tests:
- [ ] GET `/api/products` works
- [ ] POST `/api/auth/login` works
- [ ] POST `/api/contact` works
- [ ] Check Swagger UI works (if enabled)

### Frontend Tests:
- [ ] Homepage loads
- [ ] Products display correctly
- [ ] Product detail page works
- [ ] Images load
- [ ] Contact form works
- [ ] Email notification received
- [ ] Google Maps link works
- [ ] Admin login works
- [ ] Admin panel loads
- [ ] Can create product
- [ ] Can upload image
- [ ] Can edit product
- [ ] Can delete product

### Mobile Tests:
- [ ] Open site on mobile browser
- [ ] Test navigation
- [ ] Test contact form
- [ ] Click phone number (should offer to call)
- [ ] Click email (should open email app)
- [ ] Click address (should open maps)

---

## ☑️ Phase 7: Security Final Check

- [ ] Admin password changed from default
- [ ] JWT secret is strong and unique
- [ ] Database password is strong
- [ ] No sensitive data in Git repository
- [ ] HTTPS is enabled (automatic on Netlify/Railway)
- [ ] CORS only allows your frontend domain

---

## ☑️ Phase 8: Documentation

- [ ] Saved all URLs:
  - Frontend: ___________________________
  - Backend: ___________________________
  - Database: (in Railway dashboard)
- [ ] Saved all credentials securely
- [ ] Documented environment variables

---

## ☑️ Post-Deployment

- [ ] Shared website URL with stakeholders
- [ ] Set up monitoring (Railway dashboard)
- [ ] Created backup plan for database
- [ ] Planned first maintenance window
- [ ] Documented how to deploy updates

---

## 🎉 **Deployment Complete!**

**Your Website:**
- 🌐 **Frontend**: https://_________________.netlify.app
- 🔧 **Backend**: https://_________________.railway.app
- 💾 **Database**: Managed on Railway

**Next Steps:**
1. Share the URL with customers
2. Test with real users
3. Monitor for errors
4. Deploy updates via Git push

---

## 🆘 **Having Issues?**

Refer to `DEPLOYMENT_GUIDE.md` for detailed troubleshooting!

Common issues:
- CORS errors → Check FRONTEND_URL in backend
- Database connection → Check DATABASE_URL
- Images not loading → Check file upload directory
- Email not sending → Check Gmail app password

