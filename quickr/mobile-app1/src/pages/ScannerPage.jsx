import React from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';

const ScannerPage = () => {
  const navigate = useNavigate();

  const handleScanSuccess = (tableId) => {
    navigate(`/table/${tableId}`);
  };

  return <QRScanner onScanSuccess={handleScanSuccess} />;
};

export default ScannerPage;
