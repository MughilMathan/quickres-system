// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');
// const bcrypt = require('bcryptjs');
// const { MongoMemoryServer } = require('mongodb-memory-server-core');

// const authRoutes = require('./routes/auth');
// const scanRoutes = require('./routes/scan');
// const menuRoutes = require('./routes/menu');
// const orderRoutes = require('./routes/orders');
// const analyticsRoutes = require('./routes/analytics');
// const tableRoutes = require('./routes/tables');
// const settingsRoutes = require('./routes/settings');
// const menuData = require('./menuData');


// const Hotel = require('./models/Hotel');
// const Table = require('./models/Table');
// const MenuItem = require('./models/MenuItem');
// const Admin = require('./models/Admin');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true
//   }
// });

// // Middleware
// app.use(cors({
//   origin: true, // Allow all origins
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/scan', scanRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/settings', settingsRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/table', tableRoutes);

// // Abhirami Hotel Landing Page
// app.get('/hotel', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Abhirami Hotel - Order Now</title>
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body {
//           font-family: 'Arial', sans-serif;
//           background: linear-gradient(135deg, #B5451B 0%, #8B3210 100%);
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//         }
//         .container {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//           padding: 40px;
//           max-width: 600px;
//           text-align: center;
//           animation: slideIn 0.6s ease-out;
//         }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .logo {
//           font-size: 80px;
//           margin-bottom: 20px;
//         }
//         h1 {
//           color: #B5451B;
//           font-size: 32px;
//           margin-bottom: 10px;
//           font-family: 'Playfair Display', serif;
//         }
//         .location {
//           color: #666;
//           font-size: 14px;
//           margin-bottom: 30px;
//         }
//         .description {
//           color: #666;
//           margin: 20px 0;
//           line-height: 1.6;
//         }
//         .cta-buttons {
//           display: flex;
//           gap: 15px;
//           margin-top: 30px;
//           flex-wrap: wrap;
//           justify-content: center;
//         }
//         button {
//           padding: 15px 30px;
//           font-size: 16px;
//           font-weight: bold;
//           border: none;
//           border-radius: 10px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           flex: 1;
//           min-width: 200px;
//         }
//         .btn-order {
//           background: #B5451B;
//           color: white;
//         }
//         .btn-order:hover {
//           background: #8B3210;
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(181, 69, 27, 0.3);
//         }
//         .btn-admin {
//           background: rgba(181, 69, 27, 0.1);
//           color: #B5451B;
//           border: 2px solid #B5451B;
//         }
//         .btn-admin:hover {
//           background: #B5451B;
//           color: white;
//         }
//         .features {
//           margin-top: 40px;
//           text-align: left;
//         }
//         .features h3 {
//           color: #B5451B;
//           margin-bottom: 15px;
//         }
//         .features ul {
//           list-style: none;
//           color: #666;
//           line-height: 1.8;
//         }
//         .features li:before {
//           content: "✓ ";
//           color: #B5451B;
//           font-weight: bold;
//           margin-right: 10px;
//         }
//         .status {
//           margin-top: 20px;
//           padding: 15px;
//           background: #f0f0f0;
//           border-radius: 10px;
//           color: #666;
//           font-size: 14px;
//         }
//         .status.online {
//           background: #d4edda;
//           color: #155724;
//         }
//         .connection-indicator {
//           display: inline-block;
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background: #28a745;
//           margin-right: 8px;
//           animation: pulse 2s infinite;
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="logo">🍛</div>
//         <h1>Abhirami Hotel</h1>
//         <p class="location">Near Bus Stand, Thuraiyur Taluk, Trichy DT</p>
        
//         <p class="description">
//           Welcome to Abhirami Hotel! Scan the QR code at your table to start ordering authentic South Indian cuisine.
//         </p>

//         <div class="cta-buttons">
//           <button class="btn-admin" onclick="goToAdmin()">Admin Panel 📊</button>
//         </div>

//         <div class="features">
//           <h3>Why Order From Us?</h3>
//           <ul>
//             <li>Quick & Easy Ordering via QR Code</li>
//             <li>Real-Time Order Tracking</li>
//             <li>Fresh & Authentic South Indian Cuisine</li>
//             <li>Fast Food Delivery to Your Table</li>
//             <li>Multiple Payment Methods</li>
//           </ul>
//         </div>

//         <div class="status online">
//           <span class="connection-indicator"></span>
//           Connected to AbhiramiHotel Services
//         </div>
//       </div>

//       <script>
//         function goToAdmin() {
//           window.location.href = 'http://localhost:3000/dashboard';
//         }
//       </script>
//     </body>
//     </html>
//   `);
// });

// // QR Redirect Route - Hotel with Table ID
// app.get('/hotel/table/:tableId', (req, res) => {
//   const { tableId } = req.params;
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Abhirami Hotel - Table ${tableId}</title>
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body {
//           font-family: 'Arial', sans-serif;
//           background: linear-gradient(135deg, #B5451B 0%, #8B3210 100%);
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//         }
//         .container {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//           padding: 40px;
//           max-width: 600px;
//           text-align: center;
//           animation: slideIn 0.6s ease-out;
//         }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .logo {
//           font-size: 80px;
//           margin-bottom: 20px;
//         }
//         h1 {
//           color: #B5451B;
//           font-size: 32px;
//           margin-bottom: 10px;
//           font-family: 'Playfair Display', serif;
//         }
//         .table-badge {
//           background: linear-gradient(135deg, #B5451B 0%, #8B3210 100%);
//           color: white;
//           padding: 15px 30px;
//           border-radius: 50px;
//           font-size: 24px;
//           font-weight: bold;
//           margin: 20px 0;
//           display: inline-block;
//         }
//         .description {
//           color: #666;
//           margin: 20px 0;
//           line-height: 1.6;
//         }
//         button {
//           background: #B5451B;
//           color: white;
//           padding: 15px 40px;
//           font-size: 18px;
//           font-weight: bold;
//           border: none;
//           border-radius: 10px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin: 10px;
//         }
//         button:hover {
//           background: #8B3210;
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(181, 69, 27, 0.3);
//         }
//         .menu-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 15px;
//           margin: 30px 0;
//         }
//         .menu-card {
//           background: #f5f5f5;
//           padding: 15px;
//           border-radius: 10px;
//           text-align: center;
//           border: 2px solid #B5451B;
//         }
//         .menu-card span {
//           font-size: 30px;
//           display: block;
//           margin-bottom: 10px;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="logo">🍛</div>
//         <h1>Abhirami Hotel</h1>
//         <div class="table-badge">Table ${tableId}</div>
//         <p class="description">
//           Ready to order delicious South Indian cuisine? Tap the button below to start your order.
//         </p>

//         <div class="menu-grid">
//           <div class="menu-card">
//             <span>🍜</span>
//             <strong>Dosa</strong>
//           </div>
//           <div class="menu-card">
//             <span>🥘</span>
//             <strong>Idli</strong>
//           </div>
//           <div class="menu-card">
//             <span>🍲</span>
//             <strong>Sambar</strong>
//           </div>
//           <div class="menu-card">
//             <span>🥖</span>
//             <strong>Paratha</strong>
//           </div>
//         </div>

//         <button onclick="goToMobileApp()">Start Ordering Now 🛒</button>
//         <button onclick="goBack()">Back</button>
//       </div>

//       <script>
//         function goToMobileApp() {
//           window.location.href = 'http://localhost:5173/table/${tableId}';
//         }
//         function goBack() {
//           window.location.href = 'http://localhost:5000/hotel';
//         }
//       </script>
//     </body>
//     </html>
//   `);
// });

// mongoose.set('strictQuery', false);

// const ensureAdminUser = async () => {
//   const email = process.env.ADMIN_EMAIL || 'admin@abhirami.com';
//   const password = process.env.ADMIN_PASSWORD || 'admin123';
//   const hotelId = process.env.ADMIN_HOTEL_ID || 'abhirami';

//   const existingAdmin = await Admin.findOne({ email });
//   if (existingAdmin) {
//     return;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const admin = new Admin({
//     email,
//     password: hashedPassword,
//     hotelId
//   });
//   await admin.save();

//   console.log(`Created admin user ${email}`);
// };

// const seedSampleData = async () => {
//   const existingAdmin = await Admin.findOne({ email: 'admin@abhirami.com' });
//   if (existingAdmin) {
//     return;
//   }

//   const hotel = new Hotel({ name: 'abhirami', logo: '🍛' });
//   const tables = [];
//   for (let i = 1; i <= 10; i += 1) {
//     const table = new Table({ tableId: `T${i}` });
//     await table.save();
//     tables.push(table._id);
//   }

//   const savedMenuItems = [];
//   for (const item of menuData) {
//     const menuItem = new MenuItem(item);
//     await menuItem.save();
//     savedMenuItems.push(menuItem._id);
//   }


//   hotel.tables = tables;
//   hotel.menuItems = savedMenuItems;

//   await hotel.save();

//   const hashedPassword = await bcrypt.hash('admin123', 10);
//   const admin = new Admin({
//     email: 'admin@abhirami.com',
//     password: hashedPassword,
//     hotelId: 'abhirami'
//   });
//   await admin.save();

//   console.log('Seeded sample backend data for development');
// };

// const connectToMongo = async () => {
//   if (process.env.MONGO_URI) {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         serverSelectionTimeoutMS: 5000,
//         socketTimeoutMS: 45000,
//         family: 4
//       });
//       console.log('MongoDB connected');
//       await ensureAdminUser();
//       return;
//     } catch (err) {
//       console.warn('Local MongoDB unavailable, falling back to in-memory MongoDB:', err.message || err);
//     }
//   } else {
//     console.warn('No MONGO_URI configured, starting in-memory MongoDB');
//   }

//   const mongod = await MongoMemoryServer.create({ instance: { storageEngine: 'ephemeralForTest' } });
//   const uri = mongod.getUri();
//   await mongoose.connect(uri, {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     family: 4
//   });
//   console.log('Connected to in-memory MongoDB');
//   await seedSampleData();
//   await ensureAdminUser();
// };

// const startServer = async () => {
//   try {
//     await connectToMongo();

//     // For broadcasting events
//     global.io = io;

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT} and accessible from all interfaces`));
//   } catch (err) {
//     console.error('Startup error:', err.message || err);
//     process.exit(1);
//   }
// };

// // Socket.IO
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Join a specific table room for order updates
//   socket.on('join_table', (tableId) => {
//     if (typeof tableId === 'string') {
//       const roomName = `table_${tableId}`;
//       socket.join(roomName);
//       console.log(`Socket ${socket.id} joined room ${roomName}`);
//     }
//   });

//   // Join admin dashboard room for all orders
//   socket.on('join_admin', () => {
//     socket.join('admin_dashboard');
//     console.log(`Socket ${socket.id} joined admin dashboard`);
//   });

//   // Join specific hotel admin room
//   socket.on('join_hotel_admin', (hotelId) => {
//     if (typeof hotelId === 'string') {
//       const roomName = `hotel_admin_${hotelId}`;
//       socket.join(roomName);
//       console.log(`Socket ${socket.id} joined hotel admin room: ${roomName}`);
//     }
//   });

//   // Listen for order status changes from admin
//   socket.on('order:statusChange', (data) => {
//     const { orderId, tableId, status } = data;
//     console.log(`Order ${orderId} status changed to ${status}`);
//     io.to(`table_${tableId}`).emit('order:statusUpdate', { orderId, status });
//     io.to('admin_dashboard').emit('order:updated', data);
//   });

//   // Broadcast table scan events
//   socket.on('table:scan', (data) => {
//     const { tableId, hotelId } = data;
//     io.emit('table:scanned', { tableId, hotelId, timestamp: new Date() });
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });
// app.get("/", (req, res) => {
//   res.send("QuickR Backend Running 🚀");
// });

// // Export for Vercel
// module.exports = app;

// // Only start the server if this file is run directly
// if (require.main === module) {
//   startServer();
// }


const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("QuickR Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});