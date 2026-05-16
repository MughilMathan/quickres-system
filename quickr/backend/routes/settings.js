const express = require('express');
const router = express.Router();

router.get('/qr', (req, res) => {
  const qrCode = process.env.QR_CODE_URL || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=abhirami@upi&am=1&tn=Abhirami%20Hotel';
  res.json({ qrCode });
});

module.exports = router;
