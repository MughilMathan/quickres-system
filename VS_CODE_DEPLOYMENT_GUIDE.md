# 🎯 VS Code Deployment Commands - Copy & Paste Ready

## Open VS Code Terminal
Press: **`Ctrl + ~`** (or **Ctrl + `)** to open terminal

---

## 📍 Step 1: Navigate to Project Root

```powershell
cd F:\Quick_R\quickr
```

---

## 📝 Step 2: Initialize Git

```powershell
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

---

## 🔑 Step 3: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `quickres-system`
3. Click **"Create repository"**
4. Copy the URL (looks like: `https://github.com/YOUR_USERNAME/quickres-system.git`)

---

## 📤 Step 4: Push Code to GitHub

```powershell
git add .
git commit -m "Initial commit: QuickRes Smart Dining System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quickres-system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

---

## 🗄️ Step 5: Get MongoDB Connection String

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Create free cluster
3. Create database user: `quickres_admin`
4. Get connection string
5. **Copy it carefully** (you'll need it next)

---

## ⚙️ Step 6: Configure Backend

```powershell
cd backend
```

**Create .env file:**
```powershell
New-Item -Path ".env" -ItemType "file" -Value "MONGO_URI=mongodb+srv://quickres_admin:YOUR_PASSWORD@cluster.mongodb.net/quickres?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production"
```

Then edit the file manually:
- Right-click `.env` → Open with Code
- Replace `YOUR_PASSWORD` with your MongoDB password

```powershell
cd ..
```

---

## 🔗 Step 7: Configure Admin Web

```powershell
cd admin-web
```

```powershell
New-Item -Path ".env" -ItemType "file" -Value "VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com"
```

```powershell
cd ..
```

---

## 📱 Step 8: Configure Mobile App

```powershell
cd mobile-app1
```

```powershell
New-Item -Path ".env" -ItemType "file" -Value "VITE_API_URL=https://quickres-api.onrender.com
VITE_SOCKET_URL=https://quickres-api.onrender.com"
```

```powershell
cd ..
```

---

## ✅ Step 9: Test Locally (Optional)

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Admin Web (Ctrl+Shift+` for new terminal)
cd admin-web
npm run dev

# Terminal 3 - Mobile App
cd mobile-app1
npm run dev
```

Visit:
- Backend: http://localhost:5000
- Admin: http://localhost:5173
- Mobile: http://localhost:5174

---

## 📤 Step 10: Push Everything to GitHub

```powershell
git add .
git commit -m "Add environment configurations"
git push origin main
```

---

## 🚀 Step 11: Deploy to Render (Backend)

1. Go to: **https://render.com**
2. Sign up with GitHub
3. Click **"New+"** → **"Web Service"**
4. Select your `quickres-system` repository
5. Configure:
   - **Name**: `quickres-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `MONGO_URI`: (Your MongoDB connection string)
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
7. Click **"Create Web Service"**

⏳ **Wait 5 minutes...**

**Your backend URL**: `https://quickres-api.onrender.com`

---

## 🌐 Step 12: Deploy Admin Web to Vercel

1. Go to: **https://vercel.com**
2. Click **"Import Project"**
3. Select your GitHub repo
4. Configure:
   - **Project Name**: `quickres-admin`
   - **Framework**: `Vite`
   - **Root Directory**: `admin-web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_API_URL`: `https://quickres-api.onrender.com`
   - `VITE_SOCKET_URL`: `https://quickres-api.onrender.com`
6. Click **"Deploy"**

**Your admin URL**: `https://quickres-admin.vercel.app`

---

## 📱 Step 13: Deploy Mobile App to Vercel

1. In Vercel, click **"Add New"** → **"Project"**
2. Select your GitHub repo again
3. Configure:
   - **Project Name**: `quickres-customer`
   - **Framework**: `Vite`
   - **Root Directory**: `mobile-app1`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL`: `https://quickres-api.onrender.com`
   - `VITE_SOCKET_URL`: `https://quickres-api.onrender.com`
5. Click **"Deploy"**

**Your customer app URL**: `https://quickres-customer.vercel.app`

---

## 🧪 Step 14: Test Live Deployment

```powershell
# Open browser and test:
# 1. Admin: https://quickres-admin.vercel.app
# 2. Customer: https://quickres-customer.vercel.app
# 3. API: https://quickres-api.onrender.com/api/health
```

---

## 📊 Final URLs

| App | URL |
|-----|-----|
| **Admin Panel** | https://quickres-admin.vercel.app |
| **Customer App** | https://quickres-customer.vercel.app |
| **Backend API** | https://quickres-api.onrender.com |

---

## 🐛 Troubleshooting in VS Code

### Problem: Backend not starting
```powershell
cd backend
npm install
npm run dev
# Check error messages
```

### Problem: Frontend build fails
```powershell
cd admin-web
npm cache clean --force
npm install
npm run build
```

### Problem: Environment variables not loaded
```powershell
# Make sure .env file exists in the right folder
# admin-web/.env
# mobile-app1/.env
# backend/.env
Get-ChildItem -Path "admin-web" -Filter ".env"
Get-ChildItem -Path "mobile-app1" -Filter ".env"
Get-ChildItem -Path "backend" -Filter ".env"
```

### Problem: Port already in use
```powershell
# Kill process using port 5000
Get-Process | Where-Object {$_.MainWindowTitle -like "*node*"} | Stop-Process

# Or change port in backend/server.js
```

---

## 💡 Pro Tips

1. **Keep terminal open during builds** - Don't close until you see "Build complete"
2. **Check URL before sharing** - Verify all deployments work
3. **Monitor logs** - Check Render & Vercel dashboards for errors
4. **Push frequently** - Every change triggers auto-redeployment
5. **Use git branches for testing** - `git checkout -b feature/test-deployment`

---

## ✨ You're Done! 🎉

Your QuickRes system is now live and accessible worldwide!

**Share these URLs:**
- Admin Dashboard: https://quickres-admin.vercel.app
- Customer App: https://quickres-customer.vercel.app
