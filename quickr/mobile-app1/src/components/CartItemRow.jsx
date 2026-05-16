import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartItemRow = ({ item }) => {
  const { updateQty } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 bg-white dark:bg-[#1A1A1A] p-3 rounded-xl shadow-sm border border-gray-50 dark:border-gray-800"
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-[44px] h-[44px] rounded-lg object-cover bg-orange-50 dark:bg-gray-800"
      />
      
      <div className="flex-grow min-w-0">
        <h4 className="font-bold text-[13px] text-gray-800 dark:text-gray-100 truncate">
          {item.name}
        </h4>
        {item.variant && (
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            {item.variant.label}
          </p>
        )}
        <p className="text-[#B5451B] dark:text-[#F5A67D] font-bold text-[13px] mt-1">
          ₹{item.unitPrice * item.qty}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQty(item.cartKey, item.qty - 1)}
          className="w-8 h-8 rounded-full border border-[#B5451B] dark:border-[#F5A67D] flex items-center justify-center text-[#B5451B] dark:text-[#F5A67D]"
        >
          <FiMinus size={14} />
        </button>
        <span className="font-bold text-[14px] text-gray-800 dark:text-gray-100 min-w-[20px] text-center">
          {item.qty}
        </span>
        <button
          onClick={() => updateQty(item.cartKey, item.qty + 1)}
          className="w-8 h-8 rounded-full bg-[#B5451B] dark:bg-[#F5A67D] flex items-center justify-center text-white dark:text-[#1A1A1A]"
        >
          <FiPlus size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItemRow;
