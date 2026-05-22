# 🔧 Deployment Troubleshooting Guide

## 🚫 Common Issues & Solutions

---

## 1. ❌ Git Push Rejected

### Error Message
```
fatal: 'origin' does not appear to be a git repository
```

### Solution
```powershell
# Check current remote
git remote -v

# Add origin if missing
git remote add origin https://github.com/YOUR_USERNAME/quickres-system.git

# Verify
git remote -v

# Try push again
git push -u origin main
```

---

## 2. ❌ MongoDB Connection Fails

### Error Message
```
Error: connect ENOTFOUND cluster.mongodb.net
```

### Solution

**Check 1: Connection String Format**
```
✓ Correct: mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true
✗ Wrong: mongodb+srv://user@cluster.mongodb.net (missing password)
```

**Check 2: IP Whitelist**
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add IP: `0.0.0.0/0` (allow all - for testing only)
4. Or add your Render server IP

**Check 3: Database User**
1. Go to Database Users
2. Username: `quickres_admin`
3. Password: (your password)
4. Edit password if needed

**Check 4: Test Locally**
```powershell
cd backend
node -e "
const mongoose = require('mongoose');
mongoose.connect('YOUR_MONGO_URI').then(() => {
  console.log('✓ MongoDB connected');
  process.exit(0);
}).catch(err => {
  console.log('✗ Error:', err.message);
  process.exit(1);
});
"
```

---

## 3. ❌ Backend Deploy Fails on Render

### Error Message in Logs
```
Cannot find module 'express'
```

### Solution

**Check 1: package.json exists**
```powershell
cat backend/package.json
```

**Check 2: Missing dependencies**
```powershell
cd backend
npm install
cd ..
git add .
git commit -m "Update dependencies"
git push
```

**Check 3: Wrong Node version**
In Render, set Environment Variable:
```
NODE_ENV=production
```

---

## 4. ❌ Frontend Shows Blank Page

### Error Message in Browser Console
```
Cannot read property 'VITE_API_URL' of undefined
```

### Solution

**Check 1: .env file exists**
```powershell
# In VS Code terminal, go to project folder
cd admin-web
ls -la | grep .env
```

Should show:
```
.env
```

**Check 2: Restart dev server**
```powershell
# Stop current server (Ctrl+C)
# Clear cache
npm cache clean --force
npm install
npm run dev
```

**Check 3: In Vercel, verify Environment Variables**
1. Project Settings → Environment Variables
2. Check `VITE_API_URL` is set correctly
3. Redeploy

**Check 4: Restart Vercel build**
1. Go to Deployments
2. Click "Redeploy"
3. Choose "Yes, redeploy"

---

## 5. ❌ CORS Error in Browser

### Error Message
```
Access to XMLHttpRequest blocked by CORS policy
```

### Solution

**Update backend/server.js:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://quickres-admin.vercel.app',
    'https://quickres-customer.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Then:
```powershell
git add backend/server.js
git commit -m "Fix CORS configuration"
git push
# Render will auto-redeploy
```

---

## 6. ❌ Socket.IO Connection Failed

### Error Message
```
polling transport error
websocket error
```

### Solution

**Check 1: Socket.IO URL**
```javascript
// In frontend code
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_SOCKET_URL);
```

**Check 2: Update .env files**
```
VITE_SOCKET_URL=https://quickres-api.onrender.com
```

**Check 3: Update backend CORS**
```javascript
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'https://quickres-admin.vercel.app',
      'https://quickres-customer.vercel.app'
    ],
    credentials: true
  }
});
```

**Check 4: Test Socket Connection**
```powershell
# Add to frontend:
# Check browser console:
socket.on('connect', () => console.log('✓ Connected'));
socket.on('disconnect', () => console.log('✗ Disconnected'));
socket.on('error', (err) => console.log('✗ Error:', err));
```

---

## 7. ❌ QR Code Not Generating

### Error Message
```
Error generating QR code
Cannot find module 'qrcode'
```

### Solution

**Check 1: QRCode dependency installed**
```powershell
cd backend
npm list qrcode
npm install qrcode
cd ..
```

**Check 2: Verify qrcodes folder exists**
```powershell
# If not, create it
mkdir quickr/qrcodes
```

**Check 3: Check file permissions**
Ensure `/qrcodes` folder is writable:
```powershell
# Windows
icacls "F:\Quick_R\quickr\qrcodes" /grant Users:F /T
```

**Check 4: Test locally**
```powershell
cd backend
npm run dev
# Try generating QR code from admin panel
```

---

## 8. ❌ Port Already in Use

### Error Message
```
listen EADDRINUSE: address already in use :::5000
```

### Solution

**Option 1: Kill existing process**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace PID with the number from above)
taskkill /PID <PID> /F
```

**Option 2: Change port**
In `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Changed from 5000
```

---

## 9. ❌ Build Fails with "Out of Memory"

### Error Message
```
JavaScript heap out of memory
FATAL ERROR: CALL_AND_RETRY_LAST
```

### Solution

**Increase Node memory:**
```powershell
# Windows
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

Or in `package.json`:
```json
{
  "scripts": {
    "build": "cross-env NODE_OPTIONS=--max-old-space-size=4096 vite build"
  }
}
```

---

## 10. ❌ Vercel Deployment Stuck

### Error Message
```
Deployment in progress... (stuck for hours)
```

### Solution

1. Click **"Cancel Build"** in Vercel dashboard
2. Go to **"Settings"** → **"Git"**
3. Disconnect and reconnect GitHub
4. Click **"Redeploy"**

Or manually restart:
```powershell
git add .
git commit -m "Trigger redeploy"
git push
```

---

## 11. ❌ "Module not found" Error

### Error Message
```
Error: Cannot find module '@/components/Header'
```

### Solution

**Check 1: Path alias configuration**
In `vite.config.js`:
```javascript
import react from '@vitejs/plugin-react'
import path from 'path'

export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}
```

**Check 2: Also update `tsconfig.json` (if TypeScript)**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 12. ❌ Admin Login Fails

### Error Message
```
Invalid credentials
Authentication failed
```

### Solution

**Check 1: Database has admin user**
```powershell
cd backend
npm run seed
```

**Check 2: Check credentials in backend**
```javascript
// In routes or server.js
console.log('Admin credentials:', {
  email: 'admin@quickres.com',
  password: 'Admin@123456'
});
```

**Check 3: Password not hashing**
Ensure password hashing middleware is set up:
```javascript
const bcrypt = require('bcryptjs');

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

---

## 🆘 Still Stuck?

### Debug Checklist

- [ ] Check all `.env` files are created
- [ ] Verify MongoDB connection string (no typos!)
- [ ] Check Render logs: Dashboard → Select Service → Logs
- [ ] Check Vercel logs: Deployments → Click deployment → Logs
- [ ] Test locally first: `npm run dev`
- [ ] Clear cache: `npm cache clean --force`
- [ ] Reinstall dependencies: `rm -r node_modules && npm install`
- [ ] Check internet connection
- [ ] Verify all accounts are created (GitHub, MongoDB, Render, Vercel)

### How to Get Logs

**Render Backend Logs:**
1. Go to render.com
2. Select your service
3. Scroll down to "Logs"
4. Copy error messages

**Vercel Frontend Logs:**
1. Go to vercel.com
2. Select project
3. Click "Deployments"
4. Click the deployment
5. View logs

**Local Terminal Output:**
```powershell
# Run with verbose output
DEBUG=* npm run dev
```

---

## 📞 Getting Help

**For specific errors:**
1. Copy the full error message
2. Search on [Stack Overflow](https://stackoverflow.com)
3. Check [Render Documentation](https://render.com/docs)
4. Check [Vercel Documentation](https://vercel.com/docs)
5. Check [Node.js Documentation](https://nodejs.org/docs/)

**Before deploying again:**
1. Test locally: `npm run dev`
2. Build locally: `npm run build`
3. Preview build: `npm run preview`
4. Only deploy after all local tests pass

---

## ✅ How to Verify Deployment is Working

```powershell
# 1. Check backend is running
Invoke-WebRequest -Uri "https://quickres-api.onrender.com/api/health"

# 2. Check admin frontend loads
# Open browser: https://quickres-admin.vercel.app

# 3. Check customer app loads
# Open browser: https://quickres-customer.vercel.app

# 4. Check MongoDB connection
# Admin Panel → Dashboard should load

# 5. Test full flow
# 1. Admin login
# 2. Create menu item
# 3. Generate QR
# 4. Scan from mobile app
# 5. Place order
# 6. See order in admin panel
```

---

## 🎉 Success Indicators

- ✅ Backend API responds with 200 status
- ✅ Admin panel loads without errors
- ✅ Customer app loads without errors
- ✅ Admin can login
- ✅ QR codes generate successfully
- ✅ Orders appear in real-time
- ✅ No console errors in browser
- ✅ No server errors in logs

**When all ✅ - Your deployment is successful! 🚀**
