import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';
import AnimatedTicker from '../components/AnimatedTicker';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiCamera } from 'react-icons/fi';

const LandingPage = () => {
  const navigate = useNavigate();
  const { tableId } = useSession();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] flex flex-col pt-safe pb-safe overflow-hidden relative">
      <button 
        onClick={toggleTheme} 
        className="absolute top-8 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 z-10"
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="flex-grow flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-32 h-32 bg-[#B5451B]/10 rounded-full flex items-center justify-center mb-8 border-4 border-[#B5451B]/20"
        >
          <span className="text-[64px]">🍛</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-playfair text-[32px] font-black text-[#B5451B] leading-tight mb-2">
            Abhirami Hotel
          </h1>
          <p className="font-lato text-[12px] text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto mb-8">
            Near Bus Stand, Thuraiyur Taluk, Trichy DT
          </p>
        </motion.div>

        {!tableId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mb-10"
          >
            <AnimatedTicker />
          </motion.div>
        )}

        {tableId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12 bg-[#B5451B] text-white px-6 py-2 rounded-full font-lato font-bold text-[14px] shadow-lg"
          >
            Table No. {tableId}
          </motion.div>
        )}

        {!tableId ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full space-y-3"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/scan')}
              className="w-full h-[52px] bg-[#B5451B] text-white rounded-xl font-bold text-[18px] shadow-2xl shadow-[#B5451B]/30 active:bg-[#8B3210] transition-colors flex items-center justify-center gap-2"
            >
              <FiCamera size={20} />
              Scan Table QR Code
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="w-full h-[52px] bg-[#B5451B] text-white rounded-xl font-bold text-[18px] shadow-2xl shadow-[#B5451B]/30 active:bg-[#8B3210] transition-colors"
          >
            View Menu
          </motion.button>
        )}
      </div>

      <div className="p-8 text-center">
        <p className="text-[10px] text-gray-300 dark:text-gray-700 tracking-widest uppercase">
          Powered by QuickRes
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
