# 🚀 QuickRes Deployment Guide from VS Code

## 📋 Pre-Deployment Checklist

- [ ] GitHub account created
- [ ] Render account created (render.com)
- [ ] Vercel account created (vercel.com)
- [ ] MongoDB Atlas account created (mongodb.com)
- [ ] All code committed to GitHub

---

## ⚙️ STEP 1: Prepare Your Project

### 1.1 Initialize Git Repository

```bash
cd f:/Quick_R/quickr
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

### 1.2 Create .gitignore (if not exists)

```
node_modules/
.env
.env.local
dist/
build/
qrcodes/
```

### 1.3 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository: `quickres-system`
3. Don't initialize with README

### 1.4 Push to GitHub

```bash
git add .
git commit -m "Initial commit: QuickRes Smart Dining System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quickres-system.git
git push -u origin main
```

---

## 🗄️ STEP 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Login
3. Create a **Free** cluster
4. Choose region (closest to your users)
5. Create database user:
   - Username: `quickres_admin`
   - Password: Generate strong password

### 2.2 Get Connection String

1. Click "Connect"
2. Select "Drivers"
3. Copy connection string
4. Format: `mongodb+srv://quickres_admin:PASSWORD@cluster.mongodb.net/quickres?retryWrites=true&w=majority`

**Save this connection string - you'll need it for backend deployment**

---

## ⚙️ STEP 3: Prepare Backend for Deployment

### 3.1 Update Backend Configuration

In `backend/server.js`, make sure:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// Enable CORS for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3.2 Create Backend Environment File

Create `.env` in `backend/`:

```
MONGO_URI=mongodb+srv://quickres_admin:YOUR_PASSWORD@cluster.mongodb.net/quickres?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=admin@quickres.com
ADMIN_PASSWORD=your_secure_password
```

### 3.3 Update Backend package.json

```json
{
  "name": "quickres-backend",
  "version": "1.0.0",
  "engines": {
    "node": "18"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🌐 STEP 4: Deploy Backend to Render

### 4.1 Connect Render to GitHub

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repos

### 4.2 Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. Select your GitHub repo
3. Configure:
   - **Name**: `quickres-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   
4. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://quickres_admin:PASSWORD@cluster.mongodb.net/quickres?retryWrites=true&w=majority
   NODE_ENV=production
   ```

5. Click **"Create Web Service"**

⏳ Wait 3-5 minutes for deployment to complete.

**Your backend URL will be**: `https://quickres-api.onrender.com`

---

## 🎨 STEP 5: Configure Admin Web Frontend

### 5.1 Create Environment File

Create `.env` in `admin-web/`:

```
VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com
```

### 5.2 Update Vite Config

In `admin-web/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### 5.3 Build Locally to Test

```bash
cd admin-web
npm install
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the build.

---

## 📱 STEP 6: Configure Mobile App

### 6.1 Create Environment File

Create `.env` in `mobile-app1/`:

```
VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com
```

### 6.2 Build and Test Locally

```bash
cd mobile-app1
npm install
npm run build
npm run preview
```

---

## 🚀 STEP 7: Deploy Admin Web to Vercel

### 7.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Import Project"**
4. Select your GitHub repo

### 7.2 Configure Deployment

- **Project Name**: `quickres-admin`
- **Framework**: `Vite`
- **Root Directory**: `admin-web`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 7.3 Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com
```

### 7.4 Deploy

Click **"Deploy"** and wait for deployment to complete.

**Your admin URL will be**: `https://quickres-admin.vercel.app`

---

## 📱 STEP 8: Deploy Mobile App to Vercel

### 8.1 Import as Separate Project

1. In Vercel, click **"Add New..."** → **"Project"**
2. Select your GitHub repo again
3. Configure:
   - **Project Name**: `quickres-customer`
   - **Framework**: `Vite`
   - **Root Directory**: `mobile-app1`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 8.2 Add Environment Variables

```
VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com
```

### 8.3 Deploy

**Your customer app URL will be**: `https://quickres-customer.vercel.app`

---

## 🔌 STEP 9: Update Backend CORS for Production

In `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://quickres-admin.vercel.app',
    'https://quickres-customer.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

Then push to GitHub:

```bash
git add backend/server.js
git commit -m "Update CORS for production URLs"
git push
```

Render will auto-redeploy.

---

## 🧪 STEP 10: Test Your Deployment

### Test Endpoints

1. **Backend API**: `https://quickres-api.onrender.com/api/health`
2. **Admin Panel**: `https://quickres-admin.vercel.app`
3. **Customer App**: `https://quickres-customer.vercel.app`

### Test Features

- [ ] Login to admin panel
- [ ] View dashboard
- [ ] Create menu items
- [ ] Generate QR code
- [ ] Scan QR from mobile app
- [ ] Place order
- [ ] Receive order in admin panel

---

## 🔑 STEP 11: Set Up Custom Domain (Optional)

### Option A: Using Vercel Custom Domain

1. In Vercel project settings → **"Domains"**
2. Add your domain (e.g., `quickres.in`)
3. Update DNS records at your domain registrar

### Option B: Using Render Custom Domain

1. In Render service settings → **"Custom Domain"**
2. Add your domain
3. Update DNS records

---

## 📊 Final Deployment Summary

| Service | URL | Platform |
|---------|-----|----------|
| Backend API | `https://quickres-api.onrender.com` | Render |
| Admin Web | `https://quickres-admin.vercel.app` | Vercel |
| Customer App | `https://quickres-customer.vercel.app` | Vercel |
| Database | MongoDB Atlas | Cloud |

---

## 🐛 Troubleshooting

### Backend not connecting
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Check environment variables in Render

### Frontend showing errors
- Check browser console
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend

### QR codes not generating
- Verify Ghostscript installed on backend
- Check write permissions in `/qrcodes` folder

---

## 📚 Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Push changes to GitHub
git add .
git commit -m "Your message"
git push origin main

# Check backend logs
# In Render dashboard → select service → Logs
```

---

**🎉 Your QuickRes system is now live and accessible worldwide!**
