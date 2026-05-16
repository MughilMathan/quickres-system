require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const Hotel = require('./models/Hotel');
const Table = require('./models/Table');
const MenuItem = require('./models/MenuItem');
const Admin = require('./models/Admin');

const seedDB = async () => {
  // Use in-memory MongoDB like the server does
  const mongod = await MongoMemoryServer.create({ instance: { storageEngine: 'ephemeralForTest' } });
  const mongoUri = mongod.getUri();
  await mongoose.connect(mongoUri);

  // Create hotel
  const hotel = new Hotel({
    name: 'abhirami',
    logo: '🍛'
  });
  await hotel.save();

  // Create tables T1-T10
  const tables = [];
  for (let i = 1; i <= 10; i++) {
    const table = new Table({ tableId: `T${i}` });
    await table.save();
    tables.push(table._id);
  }
  hotel.tables = tables;

  // Create menu items
  const menuItems = [
    { name: 'Chicken Biryani', category: 'Main Course', price: 250, description: 'Spicy chicken biryani', imageUrl: 'https://source.unsplash.com/random/300x200/?chicken-biryani' },
    { name: 'Paneer Butter Masala', category: 'Main Course', price: 200, description: 'Creamy paneer curry', imageUrl: 'https://source.unsplash.com/random/300x200/?paneer-butter-masala' },
    { name: 'Cold Lassi', category: 'Drinks', price: 50, description: 'Refreshing yogurt drink', imageUrl: 'https://source.unsplash.com/random/300x200/?lassi' },
    // Add more as needed
  ];
  const savedMenuItems = [];
  for (const item of menuItems) {
    const menuItem = new MenuItem(item);
    await menuItem.save();
    savedMenuItems.push(menuItem._id);
  }
  hotel.menuItems = savedMenuItems;
  await hotel.save();

  // Create admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new Admin({
    email: 'admin@abhirami.com',
    password: hashedPassword,
    hotelId: 'abhirami'
  });
  await admin.save();

  console.log('Database seeded');
  process.exit();
};

seedDB();