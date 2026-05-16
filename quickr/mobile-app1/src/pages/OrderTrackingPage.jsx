import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { useOrder } from '../context/OrderContext';
import { useSession } from '../context/SessionContext';
import AppBar from '../components/AppBar';
import OrderStatusPopup from '../components/OrderStatusPopup';
import { clearSession as clearServerSession } from '../services/api';

const steps = [
  { status: 'placed', label: 'Order Received', icon: '📝' },
  { status: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
  { status: 'ready', label: 'Ready', icon: '🍽️' },
  { status: 'delivered', label: 'Delivered', icon: '✅' }
];

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { currentOrder, showStatusPopup, setShowStatusPopup, latestStatus, clearOrderLocal } = useOrder();
  const { clearSession: clearLocalSession } = useSession();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (currentOrder) {
      const stepIndex = steps.findIndex(s => s.status === currentOrder.status);
      setActiveStep(stepIndex !== -1 ? stepIndex : 0);
    }
  }, [currentOrder]);

  const handleDone = async () => {
    if (currentOrder?.orderId) {
      try {
        await clearServerSession(currentOrder.orderId);
      } catch (err) {
        console.error('Failed to clear server session', err);
      }
    }
    clearLocalSession();
    clearOrderLocal();
    navigate('/');
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <p>No active order to track.</p>
        <button onClick={() => navigate('/menu')} className="mt-4 text-[#B5451B] font-bold">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pb-32">
      <AppBar title="Live Order Tracking" showBack />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <h2 className="font-playfair text-[20px] font-black text-[#B5451B] dark:text-[#F5A67D] uppercase">
                {steps[activeStep].label}
              </h2>
            </div>
            <div className="w-12 h-12 bg-orange-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-[24px]">
              {steps[activeStep].icon}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative flex justify-between items-center mb-8 px-2">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800 -translate-y-1/2 z-0" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              className="absolute top-1/2 left-0 h-1 bg-[#B5451B] -translate-y-1/2 z-0"
            />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-500 flex items-center justify-center ${
                    idx <= activeStep 
                      ? 'bg-[#B5451B] border-[#B5451B]' 
                      : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800'
                  }`}
                >
                  {idx < activeStep && <FiCheckCircle className="text-white text-[10px]" />}
                </div>
                <span className={`text-[9px] font-bold uppercase mt-2 whitespace-nowrap ${
                  idx <= activeStep ? 'text-[#B5451B]' : 'text-gray-300'
                }`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>

          {activeStep === 1 && (
            <div className="flex items-center gap-3 bg-orange-50 dark:bg-gray-800/50 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <FiClock className="text-[#B5451B] shrink-0" />
              <p className="text-[13px] text-gray-700 dark:text-gray-300">
                Chef is cooking your order... Estimated in <span className="font-bold text-[#B5451B]">{currentOrder.estimatedTime || 15} mins</span>
              </p>
            </div>
          )}
        </motion.div>

        <div className="space-y-4">
          <h3 className="font-bold text-[14px] text-gray-400 uppercase tracking-widest ml-1">Order Details</h3>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between p-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div>
                  <p className="font-bold text-[14px] text-gray-800 dark:text-gray-100">{item.name}</p>
                  <p className="text-[11px] text-gray-500">{item.variant ? item.variant : 'Regular'} × {item.qty}</p>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-100">₹{item.lineTotal}</p>
              </div>
            ))}
            <div className="bg-gray-50 dark:bg-gray-800/20 p-4 flex justify-between items-center">
              <span className="font-bold text-gray-500 text-lg">Total Amount</span>
              <span className="font-black text-[22px] text-[#B5451B] dark:text-[#F5A67D] drop-shadow-sm">₹{currentOrder.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      <OrderStatusPopup 
        status={latestStatus} 
        isOpen={showStatusPopup} 
        onClose={() => {
          setShowStatusPopup(false);
          if (latestStatus?.status === 'delivered') {
            handleDone();
          }
        }} 
      />
    </div>
  );
};

export default OrderTrackingPage;
