import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useSession } from '../context/SessionContext';
import { useOrder } from '../context/OrderContext';
import { placeOrder } from '../services/api';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, subtotal, parcelCharge, total, takeaway, clearCart } = useCart();
  const { tableId } = useSession();
  const { placeOrderLocal } = useOrder();

  const handleOrderSubmission = async () => {
    const orderId = `A${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Map cart items to order items with proper structure for backend
    const orderItems = items.map(item => ({
      menuItemId: item._id || item.id || `item-${item.cartKey}`,
      quantity: item.qty,
      unitPrice: item.unitPrice,
      variantLabel: item.variant ? item.variant.label : null,
      specialInstructions: ''
    }));

    const orderData = {
      hotelId: 'abhirami',
      tableId: tableId || 'T1',
      sessionId: `session-${tableId || 'T1'}`,
      items: orderItems,
      totalAmount: total
    };

    try {
      const response = await placeOrder(orderData);
      const completeOrderData = { 
        ...response.data, 
        orderId,
        subtotal,
        parcelCharge,
        grandTotal: total,
        tableNumber: tableId || 'T1',
        paymentMethod: 'Cash',
        timestamp: new Date(),
        items: items.map(item => ({
          ...item,
          name: item.name,
          qty: item.qty,
          lineTotal: item.unitPrice * item.qty,
          variant: item.variant ? item.variant.label : null
        }))
      };
      placeOrderLocal(completeOrderData);
      
      setTimeout(() => {
        clearCart();
        navigate('/receipt', { state: { order: completeOrderData } });
      }, 2500);
    } catch (err) {
      console.error('Failed to submit order', err);
      // Even if API fails in demo, proceed to receipt with local data
      const localOrder = {
        orderId,
        ...orderData,
        status: 'placed',
        createdAt: new Date().toISOString(),
        subtotal,
        parcelCharge,
        grandTotal: total,
        tableNumber: tableId || 'T1',
        paymentMethod: 'Cash',
        timestamp: new Date(),
        items: items.map(item => ({
          ...item,
          name: item.name,
          qty: item.qty,
          lineTotal: item.unitPrice * item.qty,
          variant: item.variant ? item.variant.label : null
        }))
      };
      placeOrderLocal(localOrder);
      setTimeout(() => {
        clearCart();
        navigate('/receipt', { state: { order: localOrder } });
      }, 2500);
    }
  };

  useEffect(() => {
    handleOrderSubmission();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] flex flex-col items-center justify-center p-8">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
        >
          <motion.svg
            viewBox="0 0 52 52"
            className="w-12 h-12 text-white stroke-current fill-none stroke-[4px]"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.path d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </motion.svg>
        </motion.div>
        
        {/* Confetti-like particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ scale: 1, x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 50 + 40), y: (i % 3 === 0 ? 1 : -1) * (Math.random() * 50 + 40) }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-green-400"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center mt-12"
      >
        <h2 className="font-playfair text-[28px] font-black text-gray-800 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="font-lato text-gray-500 dark:text-gray-400 text-[16px]">
          Order placed for Table {tableId || 'T1'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-20 flex flex-col items-center gap-2"
      >
        <div className="w-8 h-8 border-2 border-[#B5451B]/20 border-t-[#B5451B] rounded-full animate-spin" />
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
          Generating Receipt...
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
