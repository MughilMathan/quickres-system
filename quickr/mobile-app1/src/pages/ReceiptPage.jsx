import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiShare2, FiHome, FiArrowRight } from 'react-icons/fi';
import { generatePDF, sharePDF } from '../services/pdf';
import AppBar from '../components/AppBar';
import ReceiptTemplate from '../components/ReceiptTemplate';

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <p>No receipt data found.</p>
        <button onClick={() => navigate('/menu')} className="mt-4 text-[#B5451B] font-bold">Go to Menu</button>
      </div>
    );
  }

  const handleDownload = async () => {
    await generatePDF('thermal-receipt', `Abhirami_Order_${order.orderId}.pdf`);
  };

  const handleShare = async () => {
    const blob = await generatePDF('thermal-receipt', `Abhirami_Order_${order.orderId}.pdf`);
    if (blob) {
      await sharePDF(blob, `Abhirami_Order_${order.orderId}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F0F0F] pb-32">
      <AppBar title="Order Receipt" />
      
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl p-6 relative max-w-[400px] mx-auto overflow-hidden text-black font-mono"
        >
          {/* Thermal Receipt Visuals */}
          <div className="text-center mb-6">
            <h1 className="font-playfair text-[20px] font-bold text-[#B5451B]">Abhirami Hotel</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Smart Self-Ordering System</p>
          </div>

          <div className="border-t border-dashed border-gray-300 my-4 py-4 space-y-2">
            <div className="flex justify-between text-[11px] font-bold border-b border-gray-100 pb-2 mb-2">
              <span className="flex-[3]">Item</span>
              <span className="flex-1 text-right">Qty</span>
              <span className="flex-1 text-right">Amt</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px] leading-tight">
                <div className="flex-[3]">
                  <p className="font-bold">{item.name}</p>
                  {item.variant && <p className="text-[9px] text-gray-400">{item.variant}</p>}
                </div>
                <span className="flex-1 text-right">{item.qty}</span>
                <span className="flex-1 text-right">₹{item.lineTotal}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 pt-4 space-y-1">
            <div className="flex justify-between text-[12px]">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.parcelCharge > 0 && (
              <div className="flex justify-between text-[12px]">
                <span>Parcel Charges</span>
                <span>₹{order.parcelCharge}</span>
              </div>
            )}
            <div className="flex justify-between text-[16px] font-black text-[#B5451B] pt-2 border-t border-gray-300">
              <span>TOTAL</span>
              <span className="text-[18px]">₹{order.grandTotal}</span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-dashed border-gray-200 text-[10px] text-gray-400 space-y-1">
            <p>Order ID: #{order.orderId}</p>
            <p>Table No: {order.tableNumber}</p>
            <p>Payment Mode: {order.paymentMethod}</p>
            <p>Time: {new Date(order.timestamp).toLocaleTimeString()}</p>
          </div>

          <div className="mt-8 text-center text-[10px] italic text-gray-400 uppercase tracking-widest">
            Thank you for dining with us!
          </div>

          {/* Paper cut effect circles */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 dark:bg-[#0F0F0F] rounded-full" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 dark:bg-[#0F0F0F] rounded-full" />
        </motion.div>

        {/* Action Buttons */}
        <div className="max-w-[400px] mx-auto mt-8 flex gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 h-14 bg-white dark:bg-[#1A1A1A] text-[#B5451B] dark:text-[#F5A67D] rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800 shadow-lg active:scale-95 transition-transform"
          >
            <FiDownload /> Download
          </button>
          <button
            onClick={handleShare}
            className="flex-1 h-14 bg-white dark:bg-[#1A1A1A] text-[#B5451B] dark:text-[#F5A67D] rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800 shadow-lg active:scale-95 transition-transform"
          >
            <FiShare2 /> Share
          </button>
        </div>

        <button
          onClick={() => navigate('/track')}
          className="max-w-[400px] mx-auto mt-4 w-full h-14 bg-[#B5451B] text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
        >
          Track Order Live <FiArrowRight />
        </button>
      </div>

      {/* Hidden Receipt for PDF Generation */}
      <ReceiptTemplate order={order} />
    </div>
  );
};

export default ReceiptPage;
