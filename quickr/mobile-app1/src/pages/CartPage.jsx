import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import AppBar from '../components/AppBar';
import CartItemRow from '../components/CartItemRow';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, parcelCharge, total, takeaway, toggleTakeaway, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0F0F0F] flex flex-col">
        <AppBar title="Your Cart (0)" showBack />
        <div className="flex-grow flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-orange-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-[48px]"
          >
            🥣
          </motion.div>
          <h2 className="font-playfair text-[20px] font-bold text-gray-800 dark:text-gray-100 mb-2">
            Your cart is empty
          </h2>
          <p className="font-lato text-gray-500 dark:text-gray-400 mb-8 max-w-[200px]">
            Go back and add some delicious items!
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="h-[52px] px-8 bg-[#B5451B] text-white rounded-xl font-bold shadow-lg shadow-[#B5451B]/20 active:scale-95 transition-transform"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pb-[180px]">
      <AppBar title={`Your Cart (${items.length})`} showBack />
      
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Edit anytime before payment
          </p>
          <button 
            onClick={clearCart}
            className="text-[11px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1"
          >
            <FiTrash2 /> Clear All
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <CartItemRow key={item.cartKey} item={item} />
          ))}
        </AnimatePresence>

        {/* Takeaway Toggle */}
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${takeaway ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
              <FiShoppingBag />
            </div>
            <div>
              <p className="font-bold text-[14px] text-gray-800 dark:text-gray-100 leading-none mb-1">Takeaway order?</p>
              <p className="text-[11px] text-gray-400">₹5 parcel charges apply per item</p>
            </div>
          </div>
          <button 
            onClick={toggleTakeaway}
            className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${takeaway ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}
          >
            <motion.div
              animate={{ x: takeaway ? 24 : 2 }}
              className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow-sm"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      {/* Summary and CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1A1A1A] p-6 pt-4 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-50 dark:border-gray-800 z-50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-[13px] text-gray-500">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          {takeaway && (
            <div className="flex justify-between text-[13px] text-orange-500 font-medium">
              <span>Parcel charges</span>
              <span>+₹{parcelCharge}</span>
            </div>
          )}
          <div className="border-t border-gray-100 dark:border-gray-800 my-1 pt-1 flex justify-between">
            <span className="font-bold text-gray-800 dark:text-gray-100">Total</span>
            <span className="font-black text-[#B5451B] dark:text-[#F5A67D] text-[18px]">₹{total}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/payment')}
          className="w-full h-[54px] bg-[#B5451B] text-white rounded-xl font-bold text-[16px] shadow-lg shadow-[#B5451B]/25 active:scale-95 transition-transform"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
