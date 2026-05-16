import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSmartphone, FiCreditCard, FiTarget, FiAtSign } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useSession } from '../context/SessionContext';
import AppBar from '../components/AppBar';
import PaymentMethodCard from '../components/PaymentMethodCard';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { total, items } = useCart();
  const { tableId } = useSession();
  const [selectedMethod, setSelectedMethod] = useState('upi_apps');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const orderId = `A${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePayment = () => {
    setIsProcessing(true);
    
    if (selectedMethod === 'upi_apps') {
      window.location.href = `upi://pay?pa=abhiramihotel@upi&pn=AbhiramiHotel&am=${total}&cu=INR`;
      // Simulate success after launch
      setTimeout(() => navigate('/success'), 3000);
    } else {
      // For Card, QR, UPI ID - simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/success', { 
          state: { 
            paymentMethod: selectedMethod.replace('_', ' ').toUpperCase(),
            orderId: orderId
          }
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pb-24">
      <AppBar title="Payment" showBack />

      <div className="p-4 space-y-4">
        {/* Amount Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#B5451B] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-[12px] text-[#FFD4B8] font-bold uppercase tracking-wider mb-1">Total Amount</p>
            <h2 className="font-playfair text-[36px] font-black leading-none mb-4">₹{total}</h2>
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#FFD4B8]/80">
              <span>Table No. {tableId || 'N/A'}</span>
              <span>•</span>
              <span>Order ID: #{orderId}</span>
              <span>•</span>
              <span>{items.length} items</span>
            </div>
          </div>
          {/* Abstract pattern decoration */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
        </motion.div>

        <h3 className="font-bold text-[14px] text-gray-400 uppercase tracking-widest mt-6 mb-2 ml-1">
          Select Payment Method
        </h3>

        <div className="space-y-3">
          <PaymentMethodCard
            id="upi_apps"
            icon={<FiSmartphone size={20} />}
            title="UPI Apps"
            subtext="GPay · PhonePe · Paytm"
            selected={selectedMethod === 'upi_apps'}
            onSelect={setSelectedMethod}
          />

          <PaymentMethodCard
            id="scan_qr"
            icon={<FiTarget size={20} />}
            title="Scan & Pay"
            subtext="Pay via any UPI app"
            selected={selectedMethod === 'scan_qr'}
            onSelect={setSelectedMethod}
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-2">
                <span className="text-[48px]">📸</span>
              </div>
              <p className="font-bold text-[#B5451B] dark:text-[#F5A67D] text-[18px]">₹{total}</p>
            </div>
          </PaymentMethodCard>

          <PaymentMethodCard
            id="card"
            icon={<FiCreditCard size={20} />}
            title="Credit / Debit Card"
            subtext="Visa · Mastercard · RuPay"
            selected={selectedMethod === 'card'}
            onSelect={setSelectedMethod}
          >
            <div className="space-y-3 mt-2">
              <input type="text" placeholder="Card Number" className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[14px]" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[14px]" />
                <input type="password" placeholder="CVV" className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[14px]" />
              </div>
            </div>
          </PaymentMethodCard>

          <PaymentMethodCard
            id="upi_id"
            icon={<FiAtSign size={20} />}
            title="UPI ID"
            subtext="yourname@upi"
            selected={selectedMethod === 'upi_id'}
            onSelect={setSelectedMethod}
          >
            <div className="mt-2">
              <input type="text" placeholder="Enter UPI ID" className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[14px]" />
            </div>
          </PaymentMethodCard>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#0F0F0F] border-t border-gray-50 dark:border-gray-800">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-[54px] bg-[#B5451B] text-white rounded-xl font-bold text-[16px] shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3 disabled:bg-gray-400"
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            `Pay ₹${total}`
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
