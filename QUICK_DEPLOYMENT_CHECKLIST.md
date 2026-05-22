# 🎯 Quick Deployment Checklist

## Pre-Deployment (5 mins)
- [ ] Install Git if not already installed
- [ ] Create/login to GitHub account
- [ ] Create/login to Render account
- [ ] Create/login to Vercel account
- [ ] Create/login to MongoDB Atlas account

## GitHub Setup (5 mins)
```bash
cd f:/Quick_R/quickr
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit"
```

Create repo on GitHub, then:
```bash
git remote add origin https://github.com/USERNAME/quickres-system.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub

## MongoDB Setup (3 mins)
- [ ] MongoDB Atlas free cluster created
- [ ] Database user created (username: `quickres_admin`)
- [ ] Connection string copied and saved
- [ ] IP whitelist configured (allow all for now)

## Backend Deployment - Render (10 mins)
- [ ] Backend `.env` file configured
- [ ] Root directory: `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added in Render:
  - [ ] `MONGO_URI`
  - [ ] `PORT=5000`
  - [ ] `NODE_ENV=production`
- [ ] Backend deployed and running
- [ ] Check: `https://your-backend.onrender.com/api/health`

**Backend URL:** `https://quickres-api.onrender.com`

## Frontend Deployment - Vercel (5 mins each)

### Admin Web
- [ ] `.env` file created with `VITE_API_URL`
- [ ] Root directory: `admin-web`
- [ ] Framework: `Vite`
- [ ] Build command: `npm run build`
- [ ] Output: `dist`
- [ ] Deployed to Vercel

**URL:** `https://quickres-admin.vercel.app`

### Mobile App
- [ ] `.env` file created with `VITE_API_URL`
- [ ] Root directory: `mobile-app1`
- [ ] Same Vite configuration as admin web
- [ ] Deployed to Vercel

**URL:** `https://quickres-customer.vercel.app`

## Post-Deployment Testing (10 mins)
- [ ] Backend API responds: `https://quickres-api.onrender.com`
- [ ] Admin login works
- [ ] Dashboard loads
- [ ] Mobile app loads
- [ ] QR scan feature works
- [ ] Orders flow works

## Final Steps
- [ ] Test all features end-to-end
- [ ] Set up custom domain (optional)
- [ ] Share URLs with team
- [ ] Document any issues

---

**⏱️ Total Time: ~45 minutes**

**❌ If stuck:**
1. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed steps
2. See troubleshooting section
3. Check platform-specific logs (Render/Vercel dashboards)
