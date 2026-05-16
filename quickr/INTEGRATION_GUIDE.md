# QuickRes Integration Guide

## Complete System Architecture

This document explains how all components of the QuickRes hotel ordering system are connected and work together.

---

## 🔄 System Flow Overview

### 1. **QR Code Scanning (Mobile App)**
- **Path**: `mobile-app1/src/pages/ScannerPage.jsx`
- Customer opens the mobile app and clicks "Scan Table QR Code"
- Camera opens and scans one of 10 table QR codes (T1-T10)
- QR codes are located in `/quickr/qrcodes/qr-T1.png` through `qr-T10.png`
- Each QR links to: `http://localhost:5173/table/{tableId}`
- Upon successful scan, customer is redirected to `/table/{tableId}`
- Table ID is stored in `sessionStorage` and `localStorage`

**Components Involved**:
- `QRScanner.jsx` - Uses jsQR library for real-time QR detection
- `SessionContext.jsx` - Manages active table sessions
- Socket.io emits `table:scanned` event to dashboard

---

### 2. **Menu Display & Order Creation (Mobile App)**
- **Path**: `mobile-app1/src/pages/MenuPage.jsx`
- When user enters a table, they see the menu
- MenuContext fetches items from backend API: `GET /api/menu`
- Customer adds items to cart (CartContext manages this)
- Mobile app stores order locally with all items

**API Endpoints Used**:
- `GET /api/menu` - Fetch all menu items
- `POST /api/orders` - Place/submit order

**Context Files**:
- `MenuContext.jsx` - Fetch and manage menu items
- `CartContext.jsx` - Manage shopping cart
- `OrderContext.jsx` - Handle order placement and tracking

---

### 3. **Order Submission (Backend)**
- **Path**: `backend/routes/orders.js`
- When customer completes payment (Success page), order is sent to backend
- `POST /api/orders` endpoint receives:
  ```json
  {
    "hotelId": "abhirami",
    "tableId": "T1",
    "sessionId": "session-T1",
    "items": [
      {
        "menuItemId": "...",
        "quantity": 2,
        "unitPrice": 150,
        "variantLabel": "Small"
      }
    ],
    "totalAmount": 300
  }
  ```
- Backend creates Order document in MongoDB
- A unique `orderId` (e.g., "A4523") is generated
- **Emits Socket.io event**: `order:new` → broadcasts to all admin dashboards
- Socket.io event: `order_status_updated` → sent to specific table room `table_T1`

---

### 4. **Admin Dashboard Real-Time Updates**
- **Path**: `admin-web/src/app/dashboard/page.tsx`
- Admin logs in and views live order wall
- Dashboard initially loads all active orders: `GET /api/orders/active`
- Connects to Socket.io with event: `join_admin`

**Real-Time Events Received**:
- `order:new` - New order placed by customer
- `order:statusUpdate` - Status changed (from another admin)
- `order_status_updated` - Order status updated (from backend)
- `table:scanned` - Table scanned in mobile app

**Admin Actions**:
1. Clicks "Next" button to move order through states
2. Order states: `placed` → `accepted` → `cooking` → `ready` → `delivered`
3. Backend updates order in MongoDB
4. Emits `order:statusUpdate` event back to:
   - Mobile app (via room `table_T1`)
   - All other admin dashboards
   - Order tracking page

---

### 5. **Mobile App - Real-Time Order Status**
- **Path**: `mobile-app1/src/context/OrderContext.jsx`
- Customer can track their order on the "Order Tracking" page
- Listens for socket events:
  - `order_status_updated` - Order status changed
  - `order:statusUpdate` - Alternative event format

**Order Tracking Flow**:
```
Placed (red) → Accepted (orange) → Cooking (yellow) → Ready (green) → Delivered (gray)
```

---

## 🔌 Socket.io Events Reference

### Backend Emits To Clients:
```javascript
// When new order is placed
io.emit('order:new', orderObject);

// When admin updates order status
io.to('table_T1').emit('order_status_updated', { orderId, status, estimatedTime });
io.emit('order:statusUpdate', { orderId, status });

// When table QR code is scanned
io.emit('table:scanned', { tableId, hotelId, timestamp });
```

### Clients Emit To Backend:
```javascript
// Mobile app joins specific table room
socket.emit('join_table', 'T1');

// Admin joins dashboard
socket.emit('join_admin');

// Admin joins specific hotel admin room
socket.emit('join_hotel_admin', 'abhirami');

// Admin updates order status
socket.emit('order:statusChange', { orderId, tableId, status });
```

---

## 📡 API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/active` - Get all active orders
- `GET /api/orders/active/:tableId` - Get orders for specific table
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/:orderId` - Get specific order

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item (admin)
- `PATCH /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)

### Scan
- `POST /api/scan/scan` - Handle QR scan
- `GET /api/scan/redirect/:tableId` - Redirect to mobile app
- `POST /api/scan/validate-qr` - Validate QR code
- `GET /api/scan/session/:sessionId` - Get session details

### Tables
- `GET /api/tables` - Get all tables
- `PATCH /api/tables/:tableId/free` - Mark table as free

---

## 🗂️ Project Structure

```
quickr/
├── backend/
│   ├── server.js              # Main server, socket.io setup
│   ├── routes/
│   │   ├── orders.js          # Order CRUD endpoints
│   │   ├── scan.js            # QR scan endpoints
│   │   ├── menu.js            # Menu management
│   │   └── tables.js          # Table management
│   ├── models/
│   │   ├── Order.js           # Order schema
│   │   ├── MenuItem.js        # Menu item schema
│   │   ├── Table.js           # Table schema
│   │   └── Hotel.js           # Hotel schema
│   └── package.json           # Dependencies
│
├── mobile-app1/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Home with scan button
│   │   │   ├── ScannerPage.jsx       # QR camera scanner
│   │   │   ├── MenuPage.jsx          # Menu display
│   │   │   ├── CartPage.jsx          # Shopping cart
│   │   │   ├── PaymentPage.jsx       # Payment selection
│   │   │   ├── SuccessPage.jsx       # Order submission
│   │   │   ├── ReceiptPage.jsx       # Order details
│   │   │   └── OrderTrackingPage.jsx # Live tracking
│   │   ├── context/
│   │   │   ├── SessionContext.jsx    # Table session
│   │   │   ├── MenuContext.jsx       # Menu data
│   │   │   ├── CartContext.jsx       # Shopping cart
│   │   │   └── OrderContext.jsx      # Order tracking
│   │   ├── services/
│   │   │   ├── api.js                # API calls
│   │   │   ├── socket.js             # Socket.io client
│   │   │   └── realtime.js           # Real-time updates
│   │   └── components/
│   │       ├── QRScanner.jsx         # QR scanner UI
│   │       └── ... other components
│   └── package.json
│
├── admin-web/
│   ├── src/
│   │   └── app/
│   │       ├── dashboard/
│   │       │   └── page.tsx          # Live order wall
│   │       ├── tables/
│   │       │   └── page.tsx          # Table management
│   │       ├── menu/
│   │       │   └── page.tsx          # Menu manager
│   │       └── analytics/
│   │           └── page.tsx          # Analytics
│   └── package.json
│
└── qrcodes/
    ├── qr-T1.png
    ├── qr-T2.png
    └── ... (10 total)
```

---

## 🚀 Setup Instructions

### 1. Environment Variables
Create `.env` file in `backend/`:
```
MONGO_URI=mongodb://localhost:27017/quick-reservation
MOBILE_APP_URL=http://localhost:5173
ADMIN_WEB_URL=http://localhost:3000
PORT=5000
```

### 2. Dependencies Installation

**Backend**:
```bash
cd backend
npm install
```

**Mobile App**:
```bash
cd mobile-app1
npm install
# Make sure jsqr is installed for QR scanning
npm install jsqr
```

**Admin Web**:
```bash
cd admin-web
npm install
```

### 3. Running Services

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
# Starts on http://localhost:5000
```

**Terminal 2 - Mobile App**:
```bash
cd mobile-app1
npm run dev
# Starts on http://localhost:5173
```

**Terminal 3 - Admin Web**:
```bash
cd admin-web
npm run dev
# Starts on http://localhost:3000
```

---

## 📋 Complete User Journey

### Customer Journey:
1. **Opens mobile app** → Sees landing page with "Scan Table QR Code" button
2. **Scans QR** → `QRScanner.jsx` captures QR, redirects to `/table/T1`
3. **Views menu** → `MenuPage.jsx` fetches items from backend
4. **Fills cart** → Adds items with quantities/variants
5. **Pays** → `PaymentPage.jsx` shows payment methods (UPI, Card, etc.)
6. **Submits order** → `SuccessPage.jsx` calls `POST /api/orders`
7. **Tracks order** → `OrderTrackingPage.jsx` listens for socket updates
8. **Receives updates** → Status changes appear in real-time

### Admin Journey:
1. **Logs in** → Authentication
2. **Opens dashboard** → `GET /api/orders/active` loads current orders
3. **Connects to socket** → Emits `join_admin`, listens for new orders
4. **Receives new order** → `order:new` event, appears in live wall
5. **Updates status** → Clicks "Next", calls `PATCH /api/orders/:id/status`
6. **Emits socket event** → `order:statusChange` sent to all clients
7. **Customer sees update** → Real-time status change in mobile app
8. **Marks delivered** → Order completed

---

## 🔐 Security Notes

- JWTs used for admin authentication
- CORS configured for cross-origin requests
- Socket.io uses rooms for targeted messaging
- Validation on both front and backend

---

## 📊 Database Schema

### Order Schema:
```javascript
{
  orderId: String,              // Unique order ID (e.g., "A4523")
  hotelId: String,              // Hotel reference (e.g., "abhirami")
  tableId: String,              // Table ID (e.g., "T1")
  sessionId: String,            // Session ID
  items: [{
    menuItemId: ObjectId,
    quantity: Number,
    unitPrice: Number,
    variantLabel: String,
    specialInstructions: String
  }],
  totalAmount: Number,          // Total in rupees
  status: String,               // 'placed', 'accepted', 'cooking', 'ready', 'delivered'
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✅ Testing Checklist

- [ ] QR code generated for all 10 tables
- [ ] Mobile app scans QR and redirects
- [ ] Menu loads correctly from backend
- [ ] Add to cart functionality works
- [ ] Order submission successful
- [ ] Admin dashboard receives new order in real-time
- [ ] Status updates propagate to mobile app
- [ ] Order tracking shows live updates
- [ ] Socket.io connection stable
- [ ] Multiple simultaneous orders work

---

## 🐛 Troubleshooting

### QR Scanner not working:
- Ensure jsqr package is installed: `npm install jsqr`
- Check camera permissions in browser
- Verify QR code images in `/quickr/qrcodes/`

### Orders not appearing in admin:
- Check socket.io connection (should see "Connected to server" in admin)
- Verify backend is running on port 5000
- Check browser console for errors

### Status updates not reaching mobile:
- Verify socket.io room setup: `socket.emit('join_table', tableId)`
- Check if order status event is being emitted
- Verify OrderContext is listening to socket events

---

## 📝 Notes

- Each table (T1-T10) can have multiple concurrent orders
- Orders persist in MongoDB until marked delivered
- Real-time sync uses Socket.io with rooms for scalability
- Admin dashboard shows orders across all tables/hotels
- Mobile app only sees its own table's orders

