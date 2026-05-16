import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { FiSearch, FiShoppingCart, FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AppBar = ({ title, showSearch, onSearchClick, showBack }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="bg-[#B5451B] text-white px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-1">
              <FiArrowLeft size={24} />
            </button>
          )}
          <div>
            <h1 className="font-playfair text-[18px] font-bold leading-tight">
              {title || 'Abhirami Hotel'}
            </h1>
            {!showBack && (
              <p className="font-lato text-[10px] text-[#FFD4B8]">
                Near Bus Stand, Thuraiyur Taluk, Trichy DT
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-1">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {showSearch && (
            <button onClick={onSearchClick} className="p-1">
              <FiSearch size={22} />
            </button>
          )}
          <button onClick={() => navigate('/cart')} className="relative p-1">
            <FiShoppingCart size={22} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-white text-[#B5451B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
