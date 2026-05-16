# 🎯 Quick Access - Test URLs

## **Copy-Paste Ready URLs for Testing**

### Hotel Landing Pages
```
http://localhost:5000/hotel
http://localhost:5000/hotel/table/T1
http://localhost:5000/hotel/table/T2
http://localhost:5000/hotel/table/T3
```

### Mobile App - Direct Access
```
http://localhost:5173
http://localhost:5173/table/T1
http://localhost:5173/table/T2
```

### Admin Dashboard
```
http://localhost:3000/dashboard
```

### API Endpoints (for testing with Postman)
```
GET  http://localhost:5000/api/menu
POST http://localhost:5000/api/orders
GET  http://localhost:5000/api/orders
PATCH http://localhost:5000/api/orders/{order_id}/status
POST http://localhost:5000/api/scan/scan
GET  http://localhost:5000/api/tables
```

---

## **Test Flow Steps**

### ✅ Test 1: View Abhirami Hotel Page (No Order)
1. Open: **http://localhost:5000/hotel**
2. You should see: Hotel branding, welcome message, admin button

### ✅ Test 2: View Table-Specific Landing Page
1. Open: **http://localhost:5000/hotel/table/T1**
2. You should see: Table T1 badge, menu preview, ordering button

### ✅ Test 3: Place an Order
1. From hotel page, click "Start Ordering Now"
2. Or directly open: **http://localhost:5173/table/T1**
3. Browse menu items
4. Add items to cart
5. Submit order

### ✅ Test 4: Admin Sees Order
1. Open: **http://localhost:3000/dashboard**
2. Immediately see your order appear
3. Click status buttons to update order (Preparing → Ready → Served)

### ✅ Test 5: Real-Time Updates
1. Keep both mobile app and admin dashboard open
2. From admin, update order status
3. Watch mobile app update in real-time (no refresh needed!)

---

## **Valid Table IDs for Testing**
```
T1, T2, T3, T4, T5, T6, T7, T8, T9, T10
```

Use any of these to test with different tables.

---

## **System Service Ports**
| Service | Port | Command |
|---------|------|---------|
| Backend | 5000 | `npm run dev` (from /backend) |
| Mobile App | 5173 | `npm run dev` (from /mobile-app1) |
| Admin Dashboard | 3000 | `npm run dev` (from /admin-web) |

---

## **Emergency Restart Commands**

If something stops working, restart individual services:

### Restart Backend (Port 5000)
```powershell
cd f:\Quick_R\quickr\backend
npm run dev
```

### Restart Mobile App (Port 5173)
```powershell
cd f:\Quick_R\quickr\mobile-app1
npm run dev
```

### Restart Admin Dashboard (Port 3000)
```powershell
cd f:\Quick_R\quickr\admin-web
npm run dev
```

---

## **Database Admin Credentials**
```
Email: admin@abhirami.com
Password: admin123
```

---

## **What Each Service Does**

### 🏨 Backend (Port 5000)
- Serves hotel landing pages
- Processes orders
- Manages menu
- Real-time Socket.io hub
- In-memory MongoDB database

### 📱 Mobile App (Port 5173)
- Customer ordering interface
- Menu display
- Order submission
- Real-time order status tracking

### 👨‍💼 Admin Dashboard (Port 3000)
- Live order management
- Status updates
- Order filtering
- Real-time socket.io updates

---

## **Expected System Flow**

```
1. Customer scans QR code → 
2. Opens hotel page (localhost:5000/hotel/table/T1) → 
3. Clicks "Start Ordering" → 
4. Sees mobile app (localhost:5173/table/T1) → 
5. Places order → 
6. Admin sees order instantly on dashboard (localhost:3000/dashboard) →
7. Admin updates status → 
8. Customer sees update in real-time
```

---

**All systems ready! Start testing now!** ✨
