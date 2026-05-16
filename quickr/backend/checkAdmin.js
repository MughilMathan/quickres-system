require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Admin.countDocuments();
    const admins = await Admin.find({}, { email: 1, hotelId: 1 }).lean();
    console.log('count=', count);
    console.log(JSON.stringify(admins, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
