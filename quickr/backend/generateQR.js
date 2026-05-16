const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const tables = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10'];
// QR codes now point to abhirami hotel landing page with table info
const hotelUrl = process.env.HOTEL_URL || 'http://localhost:5000';

const generateQRs = async () => {
  const qrDir = path.join(__dirname, '..', 'qrcodes');
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }

  for (const t of tables) {
    // QR code redirects to: http://localhost:5000/hotel/table/T1 (for example)
    const url = `${hotelUrl}/hotel/table/${t}`;
    const filePath = path.join(qrDir, `qr-${t}.png`);
    await QRCode.toFile(filePath, url, { width: 300 });
    console.log(`✅ QR for ${t}: ${url} → ${filePath}`);
  }
  console.log(`\n📱 All QR codes generated successfully!`);
};

generateQRs();