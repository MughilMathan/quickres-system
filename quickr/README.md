# QuickR - Smart QR-Based Restaurant Ordering System

## Overview
A complete restaurant ordering system with QR code scanning, real-time order tracking, and admin dashboard.

## 🎯 Latest Updates - Complete Integration

### ✅ New Features Implemented:
- **QR Code Camera Scanner** - Live mobile camera QR detection
- **Scanner to Web Connection** - Scan QR codes to access ordering page
- **Real-Time Order Sync** - Orders sync instantly between mobile app and admin dashboard
- **Live Admin Dashboard** - See all orders and update status in real-time
- **Order Tracking** - Customers track their food preparation in real-time

See [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md) for complete integration details.

## Tech Stack
- **Mobile App**: React + Vite + Tailwind CSS
- **Admin Web**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO + MongoDB
- **QR Scanning**: jsQR library for camera-based detection

## Features
- ✅ QR code scanning for 10 tables (T1-T10)
- ✅ Real-time order creation notifications
- ✅ Admin live order wall with status updates
- ✅ Customer order tracking with live status
- ✅ Menu management from database
- ✅ Shopping cart with variants
- ✅ Payment method selection
- ✅ Socket.io real-time synchronization
- ✅ Multi-concurrent order handling

## Quick Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and Install
```bash
cd quickr
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGO_URI=mongodb://localhost:27017/quick-reservation

# Start backend
npm run dev   # Starts on http://localhost:5000
```

### 3. Mobile App Setup
```bash
cd ../mobile-app1
npm install

# Start mobile app
npm run dev  # Starts on http://localhost:5173
```

### 4. Admin Dashboard Setup
```bash
cd ../admin-web
npm install

# Start admin web
npm run dev  # Starts on http://localhost:3000
```

## 🔄 Complete User Flow

### Customer:
1. Open mobile app → Click "Scan Table QR Code"
2. Scan one of 10 table QR codes (T1-T10)
3. View menu, add items to cart
4. Complete payment
5. Order appears in admin dashboard
6. Track order status in real-time on mobile

### Admin:
1. Login to admin dashboard
2. See live orders as customers place them
3. Click "Next" to move orders through workflow
4. Real-time updates sync to customer phones

## 📚 Documentation

- [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md) - Complete architecture and features
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Technical integration details
- [SETUP.md](./SETUP.md) - Installation and configuration

### 4. Mobile App Setup
```bash
cd ../mobile-app
npm install
npm start  # Scan QR with Expo Go
```

## Deployment

### Backend (Railway.app)
```bash
cd backend
# Add Railway remote
railway login
railway link
railway up
```

### Admin Web (Vercel)
```bash
cd admin-web
vercel --prod
```

### Mobile App (Expo EAS)
```bash
cd mobile-app
eas build --platform android
```

## QR Codes
Generated QR codes for tables T1-T10 are in `/qrcodes/`

## API Endpoints
- POST /api/scan - Validate QR and create session
- GET /api/menu/:hotelId - Get menu items
- POST /api/orders - Place order
- PATCH /api/orders/:id/status - Update order status
- GET /api/analytics/today - Daily analytics

## Socket Events
- order:new - New order notification
- order:statusUpdate - Real-time status updates
- menu:updated - Menu changes broadcast

## Contributing
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push and create PR

## License
MIT