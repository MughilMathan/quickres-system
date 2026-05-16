import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const VariantBottomSheet = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!item) return null;

  const handleConfirm = () => {
    if (selectedVariant) {
      addToCart(item, selectedVariant);
      onClose();
      setSelectedVariant(null);
    }
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
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] rounded-t-[20px] z-[101] p-5 pb-8 max-w-md mx-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
              <h2 className="font-playfair text-[18px] font-bold text-gray-800 dark:text-gray-100 mx-auto">
                {item.name}
              </h2>
              <button 
                onClick={onClose}
                className="absolute right-5 top-5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <p className="text-[12px] text-gray-500 dark:text-gray-400 text-center mb-6">
              Select your preferred variant
            </p>

            <div className="space-y-3 mb-8">
              {item.variants.map((variant) => (
                <button
                  key={variant.label}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                    selectedVariant?.label === variant.label
                      ? 'bg-[#FDF0EA] dark:bg-[#2A150D] border-[#B5451B] border-l-[4px]'
                      : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <span className={`font-semibold ${selectedVariant?.label === variant.label ? 'text-[#B5451B]' : 'text-gray-700 dark:text-gray-300'}`}>
                    {variant.label}
                  </span>
                  <span className="font-bold text-gray-800 dark:text-gray-100">
                    ₹{variant.price}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedVariant}
              className={`w-full h-[52px] rounded-xl font-bold transition-all duration-200 shadow-lg ${
                selectedVariant
                  ? 'bg-[#B5451B] text-white'
                  : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed opacity-40'
              }`}
            >
              Add to Cart
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VariantBottomSheet;
