import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

const OrderStatusPopup = ({ status, isOpen, onClose }) => {
  if (!status) return null;

  const config = {
    accepted: {
      icon: '👨‍🍳',
      title: 'Order Accepted!',
      message: 'Your food is being prepared',
      timeLabel: `Estimated time: ${status.estimatedTime || 20}–25 mins`,
      button: 'OK',
      borderColor: 'border-orange-500'
    },
    ready: {
      icon: '🍽️',
      title: 'Order Ready!',
      message: 'Your food is at your table',
      timeLabel: '',
      button: 'Great!',
      borderColor: 'border-green-500 animate-pulse'
    },
    delivered: {
      icon: '✅',
      title: 'Enjoy your Meal!',
      message: 'Thank you for dining with us',
      timeLabel: 'Abhirami Hotel',
      button: 'Done',
      borderColor: 'border-green-600'
    }
  }[status.status] || {
    icon: '⏳',
    title: 'Order Status Updated',
    message: `Your order is ${status.status}`,
    button: 'Dismiss'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] rounded-t-[24px] z-[201] p-8 text-center border-t-4 ${config.borderColor} max-w-md mx-auto`}
          >
            <div className="text-[48px] mb-4">{config.icon}</div>
            <h2 className="font-playfair text-[20px] font-bold text-gray-800 dark:text-gray-100 mb-2 uppercase tracking-wide">
              {config.title}
            </h2>
            <p className="font-lato text-gray-500 dark:text-gray-400 mb-2">
              {config.message}
            </p>
            {config.timeLabel && (
              <p className="font-bold text-[#B5451B] dark:text-[#F5A67D] text-[14px]">
                {config.timeLabel}
              </p>
            )}
            
            <button
              onClick={onClose}
              className="mt-8 bg-[#B5451B] text-white w-full h-[52px] rounded-xl font-bold text-[16px] shadow-lg active:scale-95 transition-transform"
            >
              {config.button}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderStatusPopup;
