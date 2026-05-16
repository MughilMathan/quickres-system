# QuickRes Backend Setup

## Environment Variables (.env)

```
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/quick-reservation

# Application URLs
MOBILE_APP_URL=http://localhost:5173
ADMIN_WEB_URL=http://localhost:3000

# Server Port
PORT=5000

# Optional: JWT Secret for authentication
JWT_SECRET=your-secret-key-here

# Optional: Payment Gateway Keys
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## Installation Steps

### 1. Backend Setup
```bash
cd backend
npm install

# Generate QR codes for tables
node generateQR.js

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

### 2. Mobile App Setup
```bash
cd mobile-app1
npm install

# Ensure jsQR is installed for QR scanning
npm install jsqr

# Start development server
npm run dev
```

### 3. Admin Web Setup
```bash
cd admin-web
npm install

# Start development server
npm run dev
```

## Services Running

After setup, you should have:
- **Backend**: http://localhost:5000
- **Mobile App**: http://localhost:5173
- **Admin Web**: http://localhost:3000

## Database

The system uses MongoDB (local or in-memory for development).

### Collections:
- `orders` - Customer orders
- `menuitems` - Restaurant menu
- `hotels` - Hotel information
- `tables` - Table data
- `sessions` - Customer sessions
- `admins` - Admin users

## API Documentation

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete API and Socket.io reference.

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Or let the backend use in-memory MongoDB (automatic fallback)

### Socket.io Connection Issues
- Clear browser cache and reload
- Check that backend and frontend URLs are correct in environment
- Verify websocket support in browser

## Production Deployment

### Backend
- Use MongoDB Atlas (cloud MongoDB)
- Set up environment variables on hosting platform
- Enable CORS for production domains
- Use JWT for secure authentication

### Mobile App
- Build: `npm run build`
- Deploy to Firebase Hosting or similar

### Admin Web
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar

